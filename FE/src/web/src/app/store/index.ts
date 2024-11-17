import { MetaReducer } from '@ngrx/store';
import { logger } from './logger/logger.reducer';
import { rehydrationMetaReducer } from './hydration/rehydration.reducer';

export const metaReducers: MetaReducer<any>[] = [
  logger,
  rehydrationMetaReducer,
];
