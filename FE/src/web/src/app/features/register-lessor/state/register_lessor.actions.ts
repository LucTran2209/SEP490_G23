import { createAction, props } from "@ngrx/store";
import { IRequestRegisterLessor_Step1, IRequestRegisterLessor_Step2, IRequestRegisterLessor_Step3 } from "../../../interfaces/register-lessor.interface";

export const STEP_INFO_REGISTER = "[Register lessor] step info register";
export const STEP_INFO_CARD = "[Register lessor] step card";
export const STEP_INFO_TAX = "[Register lessor] step info tax";
export const INIT_RENTERSHOP = "[Renter register lessor] init";
export const RENTERSHOP_SUCCESS = "[Renter register lessor] success";
export const RENTERSHOP_FAILURE = "[Renter register lessor] failure";

export const stepInfo = createAction(
    STEP_INFO_REGISTER, props<{content: IRequestRegisterLessor_Step1}>()
)
export const stepInfoCard = createAction(
    STEP_INFO_CARD, props<{content: IRequestRegisterLessor_Step2}>()
)
export const stepInfoTax = createAction(
    STEP_INFO_TAX, props<{content: IRequestRegisterLessor_Step3}>()
)
export const renterShop = createAction(
    INIT_RENTERSHOP, props<{formData: any}>()
)
export const renterShop_success = createAction(
    RENTERSHOP_SUCCESS, props<{message: string}>()
)
export const renterShop_failure = createAction(
    RENTERSHOP_FAILURE, props<{message: string}>()
)