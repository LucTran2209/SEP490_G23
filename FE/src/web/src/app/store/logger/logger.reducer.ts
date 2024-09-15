import { ActionReducer } from "@ngrx/store";

export function logger (reducer: ActionReducer<any>): ActionReducer<any> {
    return function(state, action){
        console.log("logger action -> reducer:",state, action);

        return reducer(state, action)
    }
}