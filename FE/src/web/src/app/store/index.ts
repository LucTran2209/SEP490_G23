import { MetaReducer } from "@ngrx/store";
import { logger } from "./logger/logger.reducer";
import { StorageService } from "../services/storage.service";
import { hydrationMetaReducer } from "./hydration/hydration.reducer";

/**
 
export const appReducer: ActionReducerMap<AppState> = {

};

 */

export const metaReducers: MetaReducer<any>[] = [
    logger,
    hydrationMetaReducer
    // hydrationMetaReducerFactory(new StorageService())
]