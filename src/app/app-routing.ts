import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TaskListComponent } from './task-list/task-list.component';
import { TaskComponent } from './task';
import { SignInComponent, SignUpComponent } from './shared-components';

export const routes: Routes = [
  { path: 'sign-in', component: SignInComponent },
  { path: 'sign-up', component: SignUpComponent },
  { path: 'dashboards', component: DashboardComponent },
  { path: 'taskList/:id', component: TaskListComponent },
  { path: 'task/:taskId', component: TaskComponent },
  //   { path: 'error/403', component: FeatureDisabledComponent },
  { path: '', redirectTo: '/sign-in', pathMatch: 'full' }
  //   { path: '**', component: PageNotFoundComponent }
];
