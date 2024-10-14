import { Action, ActionReducer, META_REDUCERS, MetaReducer } from '@ngrx/store';
import { LoadingService } from '../../services/loading.service';
import * as AuthActionType from '../../features/auth/state/auth.actions';

export function getMetaReducers(loaingService: LoadingService) {
  function loadingProcess(reducer: ActionReducer<any>): ActionReducer<any> {
    return (state, action) => {
      // switch (action.type) {
      //   case AuthActionType.LOGIN_INIT:
      //     loaingService.setLoading(AuthActionType.LOGIN_INIT);
      //     break;
      //   case AuthActionType.LOGIN_SUCCESS:
      //     loaingService.setOtherLoading(AuthActionType.LOGIN_SUCCESS, 'loaded');
      //     break;
      //   case AuthActionType.LOGIN_FAILURE:
      //     loaingService.setOtherLoading(AuthActionType.LOGIN_FAILURE, 'error');
      //     break;

      //   default:
      //     break;
      // }
      return reducer(state, action);
    };
  }
  return loadingProcess;
}

