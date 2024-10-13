import { AuthState } from '../features/auth/state/auth.state';
import { AddressProvinceVNState } from './province/province.reducer';

export interface FeatureAppState {
  featureAuth: AuthState;
}

export interface AppState {}

export interface GlobalState {
  featureAuth: AuthState;
  featureAddress: AddressProvinceVNState;
}
