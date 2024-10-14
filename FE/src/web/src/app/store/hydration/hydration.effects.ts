import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType, OnInitEffects } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import * as HydrationActions from './hydration.actions';
import { StorageService } from '../../services/storage.service';
import { distinctUntilChanged, map, switchMap, tap } from 'rxjs';
import { GlobalState } from '../app.state';
@Injectable()
export class HydrationEffects implements OnInitEffects {
  hydrate$ = createEffect(() =>
    this.action$.pipe(
      ofType(HydrationActions.scanner_hydrate),
      map(() => {
        const storageValue = this.storageService.get('state');
        if (storageValue) {
          try {
            const state = JSON.parse(storageValue);
            return HydrationActions.scanner_hydrate_success({
              globalState: state,
            });
          } catch (error) {
            this.storageService.unset('state');
          }
        }
        return HydrationActions.scanner_hydrate_failure();
      })
    )
  );

  serialize$ = createEffect(
    () =>
      this.action$.pipe(
        ofType(
          HydrationActions.scanner_hydrate_success,
          HydrationActions.scanner_hydrate_failure
        ),
        switchMap(() =>
          this.store.select((state) => ({
            auth: state.featureAuth,
            address: state.featureAddress,
          }))
        ),
        distinctUntilChanged(),
        tap((state) => this.storageService.set('state', JSON.stringify(state)))
      ),
    { dispatch: false }
  );

  constructor(
    private action$: Actions,
    private store: Store<GlobalState>,
    private storageService: StorageService
  ) {}

  ngrxOnInitEffects(): Action {
    return HydrationActions.scanner_hydrate();
  }
}
