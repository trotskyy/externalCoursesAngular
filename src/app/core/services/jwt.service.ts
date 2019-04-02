import { Injectable } from '@angular/core';
import { JwtPayload } from '../models';
import { fromEvent } from 'rxjs';
import { filter, map } from 'rxjs/operators';

@Injectable()
export class JwtService {

  private token = {
    raw: null as string,
    payload: null as JwtPayload
  };

  constructor(private window: Window) {
    fromEvent(window, 'storage').pipe(
      filter(event => (event as StorageEvent).key == 'rawToken'),
      map(event => (event as StorageEvent).newValue)
    ).subscribe(newRawToken => {
      console.log('updated token in memory')
      this.token.raw = newRawToken;
    })
  }

  public persistToken(jwtBase64String: string): void {
    this.token.raw = jwtBase64String;
    this.token.payload = this.createFromString(jwtBase64String);
    console.log('token string parsed and saved to local storage');
    console.log(this.token);
    this.window.localStorage.setItem('rawToken', jwtBase64String);
  }

  public isExpired(): boolean {
    if (!this.fetchToken().raw) {
      return true;
    }
    return Date.now() > this.token.payload.expirationDateMs
  }

  public getRawToken(): string {
    return this.fetchToken().raw;
  }

  public clearToken(): void {
    this.token.payload = null;
    this.token.raw = null;
    this.window.localStorage.removeItem('rawToken');
  }

  public getTokenPayload(): JwtPayload {
    return this.fetchToken().payload;
  }

  private fetchToken(): { raw: string, payload: JwtPayload } {
    if (this.token.raw) {
      return this.token;
    }

    const jwtBase64String = this.window.localStorage.getItem('rawToken');
       
    if (!jwtBase64String) {
      return {} as any;
    }

    this.token.raw = jwtBase64String;
    this.token.payload = this.createFromString(jwtBase64String);

    return this.token;
  }

  private createFromString(jwtBase64String: string): JwtPayload {
    const base64payload = jwtBase64String.split('.')[1];
    const payload = this.window.atob(base64payload);
    const payloadObj = JSON.parse(payload);

    return <JwtPayload> {
      subjectId: payloadObj.sub,
      issuedAtMs: +payloadObj.iat * 1000,
      expirationDateMs: +payloadObj.exp * 1000,
      issuer: payloadObj.iss,
      audience: payloadObj.aud,
      role: payloadObj['http://schemas.microsoft.com/ws/2008/06/identity/claims/role']
    };
  }
}
