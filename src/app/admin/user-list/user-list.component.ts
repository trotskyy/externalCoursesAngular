import { Component, OnInit } from '@angular/core';
import { UserService } from './user.service';
import { Observable } from 'rxjs';
import { User } from 'src/app/core/models';
import { withLatestFrom, map } from 'rxjs/operators';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  public users: User[];

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userService.getAllUsers().subscribe(users => {
      this.users = users;
    });
  }

  public deleteUser(userId: string): void {
    // console.log(userId);
    this.userService.deleteUser(userId)
      .subscribe(() => {
        this.users = this.users.filter(user => user.id !== userId);
      });
  }

}
