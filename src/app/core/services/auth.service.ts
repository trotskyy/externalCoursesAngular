import { Injectable, ErrorHandler } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable, of, throwError, BehaviorSubject } from 'rxjs';
import { delay, catchError, tap, map } from 'rxjs/operators';
import { ErrorHandlingService } from './error-handling.service';
import { User, UserLoginModel } from '../models';
import { HttpClient } from '@angular/common/http';
import { JwtService } from './jwt.service';

@Injectable()
export class AuthService {

  private currentUser$ = new BehaviorSubject<User>(null);

  constructor(private httpClient: HttpClient,
    private jwtService: JwtService,
    private errorHandlingService: ErrorHandlingService) {
  }

  public isSignedIn(): Observable<boolean> {
    return this.currentUser$.pipe(
      map(currentUser => !!currentUser)
    );
  }

  // login : new_user2
  // pass: 666
  public signIn(loginModel: UserLoginModel): Observable<User> {
    const PATH = 'https://localhost:44357/api/auth/sign-in';

    return this.httpClient.post<any>(PATH, loginModel).pipe(
      tap(({user, token}) => {
        this.jwtService.persistToken(token);
        this.currentUser$.next(user as User);
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
        this.jwtService.persistToken(token);
        this.currentUser$.next(user as User);
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

  // public validateLogin(login: string): Observable<boolean> {
  //   const valid = !this.mockedUsers.some(userItem => userItem[0].login == login);
  //   return of(valid).pipe(
  //     delay(1500),
  //     catchError(this.errorHandlingService.handleError)
  //   );
  // }
}
