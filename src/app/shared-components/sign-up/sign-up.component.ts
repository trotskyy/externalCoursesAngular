import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../core/services';
import { tap, filter, mergeMap } from 'rxjs/operators';
import { UserLoginModel } from '../../core/models';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {

  public login: string;
  public password: string;
  public password2: string;
  public firstName: string;
  public lastName: string;

  constructor(private authService: AuthService, private router: Router) { }

  public signUp(): void {
    if (this.password !== this.password2) {
      alert('passwords are differrent!');
      return;
    }

    this.authService.validateLogin(this.login).pipe(
      tap(isValid => {
        if (!isValid) {
          alert('user with such login already exists');
        }
      }),
      filter(isValid => isValid),
      mergeMap(_ =>
        this.authService.singUp(<UserLoginModel> { login: this.login, password: this.password },
          this.firstName, this.lastName))
    ).subscribe(_ => {
      this.router.navigate(['dashboards'])
    });
  }

}
