import { Action, ActionReducer } from "@ngrx/store";
import * as HydrationActions from "./hydration.actions";
import { FeatureAppState } from "../featureApp.state";


function isHydrateSuccess(
    action: Action
  ): action is ReturnType<typeof HydrationActions.scanner_hydrate_success> {
    return action.type === HydrationActions.scanner_hydrate_success.type;
  }
   

export const hydrationMetaReducer = (
    reducer: ActionReducer<FeatureAppState>
) : ActionReducer<FeatureAppState> => {
    return (state, action) => {
        if(isHydrateSuccess(action)){
            return action.featureState;
        }else {
            return reducer(state, action);
        }
    }
}



