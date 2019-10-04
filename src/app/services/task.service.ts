import { Injectable } from '@angular/core';
import { TaskModel } from '../models/task.model';
import { Subject, Observable } from 'rxjs';
import { HttpService } from './http.service';
import { tap } from 'rxjs/operators';


interface localStorageTask {
  name: string;
  seconds: number;
  date: string;
  id: string;
}

@Injectable({
  providedIn: 'root'
})

export class TaskService {

  constructor(private httpService: HttpService) { }

  private tasks: TaskModel[] = [];
  tasksUpdated = new Subject<TaskModel[]>();

  // GET TASKS, 
  // IF [], LOOKS IN LOCAL STORAGE
  getTasks(): TaskModel[] {
    if (this.tasks.length > 0) {
      return this.tasks;
    }
    else if (this.getTasksFromLocalStorage().length > 0) {
      this.tasks = this.getTasksFromLocalStorage();
    }
    return this.tasks;
  }

  //IF GETTASKS RETURN [], MAKES GET REQUEST FOR ALL TASKS 
  fetchTasks(): Observable<TaskModel[]> {
    return this.httpService.fetchTasksk().pipe(
            tap(
              (tasks: TaskModel[]) => {
                this.handleFetchTasksSuccessResponse(tasks);
              }
            )
          );
  }

  createTask(name: string): Observable<TaskModel> {
    const task = new TaskModel(name, 0, new Date());
    return this.httpService.createTask(task)
          .pipe( 
            tap(
              (task: TaskModel) => this.handleCreateTaskSuccessResponse(task)
            )
          );
  }

  updateTask(id: string, task: TaskModel): Observable<Object> {
    return this.httpService.updateTask(id, task).pipe(
      tap(
        res => this.handleUpdateTaskSuccessResponse(id, task)
      )
    )
  }

  removeTask(id: string): Observable<void | Object> {
    return this.httpService.removeTask(id).pipe(
            tap(
              res => this.handleRemoveTaskSuccessResponse(id)
            )
          )
  }


  // ITS CALLED FROM SINGLETASK COMPONENT, AND RETURNS THE INTERVAL SO IT CAN BE CLEARED (TIME PAUSED)
  startTimer(task: TaskModel): any {
    const interval = setInterval(() => {
      task.seconds++;
    }, 1000);
    return interval;
  }

  /*
   CATCHING SUCCES REQUEST RESPONSES WITH TAP OPERATOR
   AND MAKING SURE THE SERVICE IS UPDATED 
  */
  handleCreateTaskSuccessResponse(task: TaskModel): void {
    this.tasks.push(task);
    this.saveTasksToLocalStorage();
    this.tasksUpdated.next(this.tasks);
  }

  handleFetchTasksSuccessResponse(tasks: TaskModel[]): void {
    this.tasks = tasks;
    this.saveTasksToLocalStorage;
    this.tasksUpdated.next(this.tasks);
  }

  handleRemoveTaskSuccessResponse(id: string): void {
    const index = this.tasks.findIndex( (task: TaskModel) => task.id === id);
    this.tasks.splice(index, 1);
    this.saveTasksToLocalStorage();
    this.tasksUpdated.next(this.tasks);
  }

  handleUpdateTaskSuccessResponse(id: string, task: TaskModel): void {
    const index = this.tasks.findIndex( (task: TaskModel) => task.id === id);
    this.tasks[index] = task;
    this.saveTasksToLocalStorage();
    this.tasksUpdated.next(this.tasks);
  }

  /*
   SAVING AND GETTING TASKS FROM LOCALSTAROAGE 
  */
  getTasksFromLocalStorage(): TaskModel[] {
    const tasks: TaskModel[] = [];
    const localStorageTasks = JSON.parse(localStorage.getItem('tasks'));
    // TRANSFORMS IN MODEL[]
    if (localStorageTasks) {
      localStorageTasks.map( (item: localStorageTask) => {
        const task = new TaskModel(item.name, item.seconds, new Date(item.date), item.id);
        tasks.push(task);
      })
    }
    return tasks;
  }

  saveTasksToLocalStorage(): void {
    if (this.tasks.length > 0) {
      localStorage.setItem('tasks', JSON.stringify(this.getTasks()));
    } else {
      localStorage.removeItem('tasks');
    }
  }
}
