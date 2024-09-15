import { Action, ActionReducer } from "@ngrx/store";
import * as HydrationActions from "./hydration.actions";
import { FeatureAppState } from "../featureApp.state";
import { inject } from "@angular/core";
import { StorageService } from "../../services/storage.service";


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


// export function hydrationMetaReducerFactory(storageService: StorageService) {
//     return function hydrationMetaReducer(
//         reducer: ActionReducer<FeatureAppState>
//     ): ActionReducer<FeatureAppState> {
//         return (state, action) => {
//             if (action.type === INIT || action.type === UPDATE) {
//                 const storageValue = storageService.get('state');
//                 if (storageValue) {
//                     try {
//                         return JSON.parse(storageValue);
//                     } catch (error) {
//                         storageService.unset('state');
//                     }
//                 }
//             }

//             const nextState = reducer(state, action);
//             storageService.set('state', JSON.stringify(nextState));
//             return nextState;
//         }
//     }
// }
