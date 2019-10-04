import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { TaskModel } from '../models/task.model';
import { map, catchError } from 'rxjs/operators';
import { throwError, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }

  fetchTasksk() {
    return this.http.get<TaskModel[]>('https://tasktimer-d6278.firebaseio.com/tasks.json')
            .pipe(
              map( res => {
                const tasks: TaskModel[] = [];
                // TRANSFORMS REPSONSE IN MODEL[]
                if (res) {
                  Object.keys(res).map( key => {
                    const task = new TaskModel(res[key].name, res[key].seconds, new Date(res[key].date), key);
                    tasks.push(task);
                  });
                }
                return tasks;
              }),
              catchError(this.handleError)
            );
  }
  
  createTask(task: TaskModel) {
    return this.http.post<TaskModel>('https://tasktimer-d6278.firebaseio.com/tasks.json', task)
            .pipe(
              map( res => {
                task.id = res.name;
                return task;
              }),
              catchError(this.handleError)
            );
  }

  updateTask(id: string, task: TaskModel) {
    return this.http.put<TaskModel>('https://tasktimer-d6278.firebaseio.com/tasks/' + id + '.json', task)
          .pipe(
            catchError(this.handleError),
          )
  }

  removeTask(id: string) {
    return this.http.delete<Object>('https://tasktimer-d6278.firebaseio.com/tasks/' + id + '.json')
          .pipe(
            catchError(this.handleError),
          )
  }


  handleError(err: HttpErrorResponse): Observable<never> {
    return throwError('Error ocured');
  }

}
