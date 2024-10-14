import { MetaReducer } from '@ngrx/store';
import { hydrationMetaReducer } from './hydration/hydration.reducer';
import { logger } from './logger/logger.reducer';

export const metaReducers: MetaReducer<any>[] = [logger, hydrationMetaReducer];
