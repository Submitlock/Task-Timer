import { Component, OnInit, Input } from '@angular/core';
import { TaskModel } from '../models/task.model';
import { TaskService } from '../services/task.service';

@Component({
  selector: 'app-single-task',
  templateUrl: './single-task.component.html',
  styleUrls: ['./single-task.component.css']
})
export class SingleTaskComponent implements OnInit {

  constructor(private taskService: TaskService) { }

  @Input() task: TaskModel;
  
  interval: any;
  timeRuning = false;
  loading = false;
  errorMsg: string;

  ngOnInit() {
  }

  onStartTimer(): void {
   const interval = this.taskService.startTimer(this.task);
   this.interval = interval;
   this.timeRuning = true;
  }

  onStopTimer(): void {
    this.loading = true;
    clearInterval(this.interval);
    this.timeRuning = false;
    this.taskService.updateTask(this.task.id, this.task).subscribe(
      () => this.loading = false,
      err => this.handleError(err)
    )
  }

  onRemoveTask(): void {
    this.loading = true;
    this.taskService.removeTask(this.task.id).subscribe(
      () => this.loading = false,
      err => this.handleError(err)
    )
  }

  handleError(err: string): void {
    this.loading = false;
    this.errorMsg = err;
    setTimeout( () => this.errorMsg = '', 2000 );
  }
  
}
