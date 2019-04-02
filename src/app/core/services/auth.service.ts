import { Injectable, ErrorHandler } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable, of, throwError, BehaviorSubject } from 'rxjs';
import { delay, catchError, tap, map } from 'rxjs/operators';
import { ErrorHandlingService } from './error-handling.service';
import { User, UserLoginModel, Role } from '../models';
import { HttpClient } from '@angular/common/http';
import { JwtService } from './jwt.service';
import { CurrentUserInitializingService } from 'src/app/core/services/current-user-initializing.service';

@Injectable()
export class AuthService {

  private currentUser$: BehaviorSubject<User>;

  constructor(currentUserInitializingService: CurrentUserInitializingService,
    private httpClient: HttpClient,
    private jwtService: JwtService,
    private errorHandlingService: ErrorHandlingService) {

      this.currentUser$ = new BehaviorSubject(currentUserInitializingService.initialCurrentUser);
  }

  public isSignedIn(): Observable<boolean> {
    return this.currentUser$.pipe(
      map(currentUser => !!currentUser)
    );
  }

  public getRole(): Observable<Role> {
    return this.currentUser$.pipe(
      map(currentUser => currentUser ? currentUser.role : null)
    );
  }

  // login : new_user2
  // pass: 666
  public signIn(loginModel: UserLoginModel): Observable<User> {
    const PATH = 'https://localhost:44357/api/auth/sign-in';

    return this.httpClient.post<any>(PATH, loginModel).pipe(
      tap(({user, token}) => {
        this.handleUserAndToken(user, token);
      }),
      catchError(this.errorHandlingService.handleError)
    );
  }

  public singUp(loginModel: UserLoginModel, firstName: string, lastName: string): Observable<User> {
    const PATH = 'https://localhost:44357/api/auth/sign-up';

    return this.httpClient.post<any>(PATH, {
      signInModel: loginModel,
      firstName: firstName,
      lastName: lastName
    }).pipe(
      tap(({user, token}) => {
        this.handleUserAndToken(user, token);
      }),
      catchError(this.errorHandlingService.handleError)
    );
  }

  public signOut(): Observable<void> {
    return of(null).pipe(
      delay(1500),
      tap(() => {
        this.currentUser$.next(null);
        this.jwtService.clearToken();
      })
    )
  }

  public getCurrentUser(): Observable<User> {
    return this.currentUser$.asObservable();
  }

  private handleUserAndToken(user: User, token: string): void {
    this.jwtService.persistToken(token);
    user.role = this.jwtService.getTokenPayload().role;
    console.log(user)
    this.currentUser$.next(user);
  }

  // public validateLogin(login: string): Observable<boolean> {
  //   const valid = !this.mockedUsers.some(userItem => userItem[0].login == login);
  //   return of(valid).pipe(
  //     delay(1500),
  //     catchError(this.errorHandlingService.handleError)
  //   );
  // }
}
