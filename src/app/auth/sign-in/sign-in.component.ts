import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent {
  username: string;
  password: string;

  constructor(private router: Router, private authService: AuthService) { }

  login(): void {
    this.authService.signIn({
      login: this.username,
      password: this.password
    }).subscribe(() => {
     this.router.navigate(['dashboards']);      
    }, () => {
      alert('Invalid credentials');
    });
  }
}
