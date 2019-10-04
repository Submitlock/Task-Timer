import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { TaskFormComponent } from './task-form/task-form.component';
import { TaskListComponent } from './task-list/task-list.component';
import { SingleTaskComponent } from './single-task/single-task.component';
import { TransformSecondsPipe } from './pipes/transform-seconds.pipe';
import { LoaderComponent } from './shared/loader/loader.component';
import { BtnLoaderComponent } from './shared/btn-loader/btn-loader.component';
import { AlertComponent } from './shared/alert/alert.component';

@NgModule({
  declarations: [
    AppComponent,
    TaskFormComponent,
    TaskListComponent,
    SingleTaskComponent,
    TransformSecondsPipe,
    LoaderComponent,
    BtnLoaderComponent,
    AlertComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }
