import { createFeature, createSelector } from "@ngrx/store";
import { getFeatureKeyValue } from "../../../configs/feature_key.config";
import { usersReducer } from "./user.reducer";

export const userFeature = createFeature({
    name: getFeatureKeyValue('userFeature'),
    reducer: usersReducer,
    extraSelectors: ({selectDataUser}) => ({
        selectRole: createSelector(
            selectDataUser, (dataUser) => {return dataUser.role}
        )
    })
})


export const { selectDataUser, selectMessage, selectStatus, selectRole } = userFeature
