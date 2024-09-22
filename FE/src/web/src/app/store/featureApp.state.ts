import { ActionReducerMap, FeatureConfig } from "@ngrx/store";
import { AuthState } from "../features/auth/state/auth.state";
import { UserState } from "../features/users/state/user.state";
import { authFeature } from "../features/auth/state/auth.feature";

export interface FeatureAppState {
    featureAuth: AuthState,
    featureUser: UserState
  };

