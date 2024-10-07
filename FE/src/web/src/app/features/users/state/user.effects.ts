import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import * as UserActions from './user.actions';
import * as AuthActions from '../../auth/state/auth.actions';
import { catchError, map, of, switchMap, tap } from "rxjs";
import { AuthService } from "../../../services/auth.service";
import { UserService } from "../../../services/user.service";
@Injectable()

export class UserEffects {

    constructor(private action$: Actions, private authService: AuthService, private userService: UserService) {}

    loadUserOnAppInit = createEffect(() => 
        this.action$.pipe(
            ofType(UserActions.getUser, AuthActions.login_success),
            switchMap(() => {
                const token = this.authService.token;
                if(token){
                    return this.userService.getCurrentUser(token).pipe(
                        map(userData => UserActions.getUser_success({dataUser: userData})),
                        catchError(error =>  of(UserActions.getUser_failure({error: 'Token is invalid'})))
                    )
                }else {
                    return of(UserActions.getUser_failure({error: 'Not found token!'}))
                }
            })
        ),{
            dispatch: true
        }
    )

    AfterGetUserSuccess = createEffect(() =>
    this.action$.pipe(
        ofType(UserActions.getUser_success),
        tap(action => {
            this.authService.redirectToPageAfter();
        })
    ),{
        dispatch: false
    })

}