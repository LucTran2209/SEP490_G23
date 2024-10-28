import { AuthState } from '../features/auth/state/auth.state';
import { IRegisterLessorState } from '../features/register-lessor/state/register_lessor.reducer';
import { AddressProvinceVNState } from './province/province.reducer';

export interface FeatureAppState {
  featureAuth: AuthState;
  featureRegisterLessor: IRegisterLessorState
}

export interface AppState {}

export interface GlobalState {
  featureAuth: AuthState;
  featureAddress: AddressProvinceVNState;
}
