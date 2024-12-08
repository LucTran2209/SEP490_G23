import { createFeature } from '@ngrx/store';
import { feature_key } from '../../../configs/feature_key.config';
import { authReducer } from './auth.reducer';

export const authFeature = createFeature({
  name: feature_key['authFeature'],
  reducer: authReducer,
});

export const {
  selectIsAuthenticated,
  selectMessage,
  selectStatus,
  selectMessageRegister,
  selectIsRefreshing,
  selectErrorRegister,
  selectIsRecoveringPassword,
  selectIsHasConditionRegister,
  selectStatusCode
} = authFeature;
