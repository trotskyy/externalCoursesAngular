import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';

@Injectable()
export class ErrorHandlingService {

  constructor() { }

  public handleError(error: any): Observable<any> {
    console.error(error);
    return throwError(error);
  }
}
