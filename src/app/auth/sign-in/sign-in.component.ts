import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent {
  username: string;
  password: string;

  constructor(private router: Router) { }

  login(): void {
    if (this.username === 'admin' && this.password === 'admin') {
     this.router.navigate(['user']);
    } else {
      alert('Invalid credentials');
    }
  }
}
