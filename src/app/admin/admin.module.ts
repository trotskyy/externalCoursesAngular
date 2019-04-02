import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserListComponent } from './user-list/user-list.component';
import { AdminRoutingModule } from './admin-routing';

@NgModule({
  imports: [
    CommonModule,
    // Routing module should be imported last
    AdminRoutingModule
  ],
  declarations: [UserListComponent]
})
export class AdminModule { }
