import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { User } from "../models";
import { ErrorHandlingService } from "./error-handling.service";
import { catchError, tap, map } from "rxjs/operators";
import { JwtService } from "./jwt.service";

@Injectable()
export class CurrentUserInitializingService {

    public initialCurrentUser: User;

    constructor(private httpClient: HttpClient, private jwtService: JwtService) {
    }

    public loadCurrentUser(): Promise<boolean> {
        return new Promise((resolve, reject) => {
            return this.httpClient
            .get<User>('https://localhost:44357/api/user/current')
            .subscribe(initialCurrentUser => {
                this.initialCurrentUser = initialCurrentUser;
                this.initialCurrentUser.role = this.jwtService.getTokenPayload().role;
                resolve(true);
            }, error => {
                if (error.status !== 401) {
                    throw new Error(error)
                }
                resolve(true)
            });
        });
    }
}
