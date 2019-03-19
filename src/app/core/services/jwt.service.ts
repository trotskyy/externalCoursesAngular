import { Injectable } from '@angular/core';
import { JwtPayload } from '../models';

@Injectable()
export class JwtService {

  private token = {
    raw: null as string,
    payload: null as JwtPayload
  };

  constructor(private window: Window) { }

  public persistToken(jwtBase64String: string): void {
    this.token.raw = jwtBase64String;
    this.token.payload = this.createFromString(jwtBase64String);
    console.log(this.token);
  }

  public isExpired(): boolean {
    if (!this.token.payload) {
      return true;
    }
    return Date.now() > this.token.payload.expirationDateMs
  }

  public getRawToken(): string {
    return this.token.raw;
  }

  public clearToken(): void {
    this.token.payload = null;
    this.token.raw = null;
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
      audience: payloadObj.aud
    };
  }
}
