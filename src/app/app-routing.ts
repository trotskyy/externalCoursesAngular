import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TaskListComponent } from './task-list/task-list.component';
import { TaskComponent } from './task';
import { SignInComponent, SignUpComponent } from './shared-components';
import { HomeComponent } from './home/home.component';
import { TaskListResolver } from './task-list/task-list.resolver';

export const routes: Routes = [
  { path: 'sign-in', component: SignInComponent },
  { path: 'sign-up', component: SignUpComponent },
  { path: 'dashboards', component: DashboardComponent },
  { 
    // using resolver to prevent component loading until data was loaded
    path: 'taskList/:id',
    component: TaskListComponent,
    resolve: {
      taskList: TaskListResolver
    }
  },
  { path: 'task/:taskId', component: TaskComponent },
  { path: '', component: HomeComponent, pathMatch: 'full' }
  //   { path: 'error/403', component: FeatureDisabledComponent },
  //   { path: '**', component: PageNotFoundComponent }
];
