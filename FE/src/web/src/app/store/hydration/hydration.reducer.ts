import { Action, ActionReducer } from '@ngrx/store';
import { GlobalState } from '../app.state';
import * as HydrationActions from './hydration.actions';

function isHydrateSuccess(
  action: Action
): action is ReturnType<typeof HydrationActions.scanner_hydrate_success> {
  return action.type === HydrationActions.scanner_hydrate_success.type;
}

export const hydrationMetaReducer = (
  reducer: ActionReducer<GlobalState>
): ActionReducer<GlobalState> => {
  return (state, action) => {
    if (isHydrateSuccess(action)) {
      return action.globalState;
    } else {
      return reducer(state, action);
    }
  };
};
