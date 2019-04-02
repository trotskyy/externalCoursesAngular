import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../../core/models';
import { ErrorHandlingService } from '../../core/services';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private readonly PATH = 'https://localhost:44357/api';

  constructor(private httpClient: HttpClient, private errorHandlingService: ErrorHandlingService) {
  }

  public getAllUsers(): Observable<User[]> {
    
    return this.httpClient.get<User[]>(`${this.PATH}/user`).pipe(
      catchError(this.errorHandlingService.handleError)
    )
  }

  public deleteUser(userId: string): Observable<void> {
    return this.httpClient.delete(`${this.PATH}/user/${userId}`).pipe(
      catchError(this.errorHandlingService.handleError)
    )
  }
}
