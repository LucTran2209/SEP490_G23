
import { createFeature } from "@ngrx/store";
import { feature_key } from "../../../configs/feature_key.config";
import { authReducer } from "./auth.reducer";


export const authFeature = createFeature({
    name: feature_key['authFeature'],
    reducer: authReducer
})

export const { selectDataUser, selectIsAuthenticated, selectMessage, selectStatus, selectMessageRegister, selectErrorRegister } = authFeature;