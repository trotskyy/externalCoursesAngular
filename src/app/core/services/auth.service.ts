import { Injectable, ErrorHandler } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable, of, throwError, BehaviorSubject } from 'rxjs';
import { delay, catchError, tap, map } from 'rxjs/operators';
import { ErrorHandlingService } from './error-handling.service';
import { User, UserLoginModel } from '../models';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class AuthService {

  private mockedUsers: Array<[UserLoginModel, User]> = [
    [ 
      <UserLoginModel>{
        login: 'user1',
        password: 'qwerty'
      },
      <User>{
        id: 123,
        firstName: 'Vasya',
        lastName: 'Pupkin',
      }
    ],
    [ 
      <UserLoginModel>{
        login: 'user2',
        password: '666'
      },
      <User>{
        id: 123,
        firstName: 'Vasya',
        lastName: 'Pupkin',
      }
    ]
  ];

  private currentUser$ = new BehaviorSubject<User>(null);

  constructor(private httpClient: HttpClient,
    private errorHandlingService: ErrorHandlingService) {
  }

  public isSignedIn(): Observable<boolean> {
    return this.currentUser$.pipe(
      map(currentUser => !!currentUser)
    );
  }

  private findUser(loginModel: UserLoginModel): Observable<User> {
    const userItem = this.mockedUsers
      .find(userItem => userItem[0].login === loginModel.login
        && userItem[0].password === loginModel.password);
    return !!userItem
      ? of(userItem[1])
      : throwError({
        status: 403
      })
  }

  public signIn(loginModel: UserLoginModel): Observable<User> {
    
    return this.findUser(loginModel).pipe(
      delay(1500),
      tap(user => {
        this.currentUser$.next(user);
      }),
      catchError(this.errorHandlingService.handleError)
    );
  }

  public singUp(loginModel: UserLoginModel, firstName: string, lastName: string): Observable<User> {
    return of(<User>{
      id: 456,
      firstName: firstName,
      lastName: lastName,
    }).pipe(
      delay(1500),
      tap(user => {
        this.mockedUsers.push([loginModel, user]);
        this.currentUser$.next(user);
      }),
      catchError(this.errorHandlingService.handleError)
    );
  }

  public signOut(): Observable<void> {
    return of(null).pipe(
      delay(1500),
      tap(() => {
        this.currentUser$.next(null);
      })
    )
  }

  public getCurrentUser(): Observable<User> {
    return this.currentUser$.asObservable();
  }

  public validateLogin(login: string): Observable<boolean> {
    const valid = !this.mockedUsers.some(userItem => userItem[0].login == login);
    return of(valid).pipe(
      delay(1500),
      catchError(this.errorHandlingService.handleError)
    );
  }
}
