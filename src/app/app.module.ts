import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { routes } from './app-routing';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TaskListComponent } from './task-list/task-list.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { MaterialExportsModule } from './material-exports/material-exports.module';
import { TaskComponent } from './task';
import { CoreModule } from './core/core.module';
import { FormsModule } from '@angular/forms';
import { SharedComponentsModule } from './shared-components/shared-components.module';
import { HomeComponent } from './home/home.component';
import { TaskListResolver } from './task-list/task-list.resolver';
import { EditTaskComponent } from './task-list/edit-task/edit-task.component';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    DashboardComponent,
    TaskListComponent,
    TaskComponent,
    HomeComponent,
    EditTaskComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialExportsModule,
    FormsModule,
    CoreModule.forRoot(),
    SharedComponentsModule,
    // Routing module should always be in the end of imports!
    RouterModule.forRoot(routes),
  ],
  providers: [
    TaskListResolver
  ],
  entryComponents: [EditTaskComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
