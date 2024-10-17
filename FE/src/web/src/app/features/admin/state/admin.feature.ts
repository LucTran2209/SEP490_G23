import { createFeature } from '@ngrx/store';
import { feature_key } from '../../../configs/feature_key.config';
import { adminReducer } from './admin.reducer';

export const adminFeature = createFeature({
    name: feature_key['adminFeature'],
    reducer: adminReducer,
  });

  export const {
    selectMessage,
    selectStatus,
    selectMessageCreateUser,
    selectErrorCreateUser,
  } = adminFeature;