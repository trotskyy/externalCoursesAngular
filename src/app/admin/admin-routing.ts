import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { UserListComponent } from "./user-list/user-list.component";
import { AdminGuard } from "../core/guards/admin.guard";

const routes: Routes = [
  { path: 'admin', 
    canActivate: [ AdminGuard ],
    canActivateChild: [ AdminGuard ],    
    children: [
        { path: 'user-list', component: UserListComponent }
    ] 
  }  
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ]
})
export class AdminRoutingModule {

}
