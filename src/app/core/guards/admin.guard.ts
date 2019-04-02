import { Injectable } from "@angular/core";
import { CanActivate, CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { AuthService } from "../services";
import { Role } from "../models";
import { map, tap } from "rxjs/operators";
import { Observable } from "rxjs";

@Injectable()
export class AdminGuard implements CanActivate, CanActivateChild {
    
    constructor(private authService: AuthService) {
    }

    public canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        return this.isAdmin();
    }

    public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        return this.isAdmin();
    }

    private isAdmin(): Observable<boolean> {
        console.log('verifying if current user is admin');
        return this.authService.getRole().pipe(
            map(role => role === 'Admin'),
            tap(isAdmin => console.log(isAdmin))
        );
    }
}
