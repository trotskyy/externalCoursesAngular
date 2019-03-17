import { Component, OnInit } from '@angular/core';
import { AuthService } from '../core/services';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent {

  public get isUserSignedIn$(): Observable<boolean> {
    return this.authSevice.isSignedIn();
  }

  constructor(private authSevice: AuthService, private router: Router) { 
  }

  public signOut(): void {
    this.authSevice.signOut().subscribe(() => {
      this.router.navigate([''])
    })
  }
}
