import { Component, OnInit } from '@angular/core';
import { TaskService } from '../services/task.service';
import { TaskModel } from '../models/task.model';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {

  constructor(private taskService: TaskService) { }

  tasks: TaskModel[] = [];
  loading = true;
  noTasksMsg = false;
  errorMsg: string;

  ngOnInit() {
    this.initComponent();
  }

  initComponent() {
    // GET TASKS FROM SERVICE OR LOCALSTORAGE
    this.tasks = this.taskService.getTasks();
    if (this.tasks.length > 0) {
      this.loading = false;
    }
    //SUBSCRIBE FOR THE TASKS UPDATED SUBJECT
    this.taskService.tasksUpdated.subscribe( (tasks: TaskModel[]) => {
      this.loading = false;
      this.tasks = tasks;
      if (this.tasks.length > 0) {
        this.noTasksMsg = false;
      } else {
        this.noTasksMsg = true;
      }
    });
    // MAKE GET REQUEST IF NO TASKS IN SERVICE OR LOCALSTORAGE 
    // UPDATES THE TASKS VIA TASKS UPDATED SUBJECT
    // CATCHES ERRORS AND DISPLAY ALERT DIV IF ANY
    this.taskService.fetchTasks().subscribe(
      (tasks: TaskModel[]) => {return},
      err => {
        this.errorMsg = err;
        setTimeout(() => this.errorMsg = '' , 2000);
        this.loading = false;
      }
    );
  }

}