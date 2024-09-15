import { Injectable } from "@angular/core";
import { AuthService } from "../../../services/auth.service";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import * as AuthActions from './auth.actions';
import * as UserActions from '../../users/state/user.actions';
import { catchError, defer, map, mergeMap, of, tap } from "rxjs";
import { LocalStorageKey } from "../../../utils/constant";

@Injectable()

export class AuthEffect {

    constructor(
        private action$: Actions,
        private authService: AuthService,
        private router: Router,
        private store: Store
    ) { }

    loginProcess$ = createEffect(() =>
        this.action$.pipe(
            ofType(AuthActions.login),
            mergeMap(({ data }) => this.authService.login(data)),
            map(data => AuthActions.login_success({user: data})),
            catchError(error => of(AuthActions.login_failure({ error })))
        ), {
        dispatch: true
    })

    loginSuccess$ = createEffect(() =>
        this.action$.pipe(
            ofType(AuthActions.login_success),
            tap((action) => {
                this.authService.startSession(action.user)

                // this.store.dispatch(UserActions.getUser());
            })
        ),
        { dispatch: false }
    )

    // init$ = createEffect(
    // () => defer(() => {
    //     const userData = localStorage.getItem("comc__"+LocalStorageKey.currentUser);
    //     if(userData){
    //         return of(AuthActions.login_success({user: userData}))
    //     }
    // })
    // )

}