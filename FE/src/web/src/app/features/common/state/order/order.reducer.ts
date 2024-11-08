import { createFeature, createReducer, on } from '@ngrx/store';
import { StatusProcess } from '../../../../interfaces/anonymous.interface';
import * as OrderActions from './order.actions';
import { feature_key } from '../../../../configs/feature_key.config';
export interface OrdeProductState {
  status: StatusProcess;
  message: string | null;
}

const initialState: OrdeProductState = {
  status: 'idle',
  message: null,
};

export const ordeProductRentalReducer = createReducer(
  initialState,
  on(OrderActions.createOrder, (state, action) => ({
    ...state,
    status: 'loading' as StatusProcess,
  })),
  on(OrderActions.createOrder_success, (state, action) => ({
    message: action.message,
    status: 'loaded' as StatusProcess,
  })),
  on(OrderActions.createOrder_failure, (state, action) => ({
    message: action.message,
    status: 'error' as StatusProcess,
  })),
  on(OrderActions.resetOrderState, () => initialState)
);


export const featureOrderRentalProduct = createFeature({
  name: feature_key["orderProductFeature"],
  reducer: ordeProductRentalReducer
})

export const {
  selectFeature_orderProductState,
  selectMessage,
  selectStatus
} = featureOrderRentalProduct;