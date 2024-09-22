import { MetaReducer } from "@ngrx/store";
import { logger } from "./logger/logger.reducer";
import { hydrationMetaReducer } from "./hydration/hydration.reducer";
import { getMetaReducers } from "./update-statusprocess/update-status-process.reducer";
import { LoadingService } from "../services/loading.service";

/**
 
export const appReducer: ActionReducerMap<AppState> = {

};

 */

export const metaReducers: MetaReducer<any>[] = [
    logger,
    hydrationMetaReducer,
    getMetaReducers(new LoadingService),
]