import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';
import { TaskService } from '../services/task.service';
import { TaskModel } from '../models/task.model';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css']
})
export class TaskFormComponent implements OnInit {

  constructor(private taskService: TaskService) { }

  @ViewChild('f', {static: false}) form: NgForm;
  
  loading = false;
  errorMsg: string;

  ngOnInit() {
  }

  onSubmit(form: NgForm) {
    this.loading = true;
    const name: string = form.value.name;
    // POST REQUEST AND CATCH ERROR OF ANY
    this.taskService.createTask(name).subscribe(
      () => this.loading = false,
      err => this.handleError(err)
    );

    form.reset();
  }

  handleError(err: string) {
    this.loading = false;
    this.errorMsg = err;
    setInterval( () => this.errorMsg = '', 2000 );
  }


}
