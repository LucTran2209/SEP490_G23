import { createFeature, createReducer, createSelector, on } from '@ngrx/store';
import * as OrderDetailActions from './order-detail.actions';
import { StatusProcess } from '../../../../interfaces/anonymous.interface';
import { feature_key } from '../../../../configs/feature_key.config';
export interface OrderDetailState {
  status: StatusProcess;
  message: string | null;
  errMessage: string | null;
  orderDetail: any;
}

export const initialState: OrderDetailState = {
  errMessage: '',
  message: '',
  orderDetail: null,
  status: 'idle',
};
const reducer = createReducer(
  initialState,
  on(OrderDetailActions.getOrderDetail, (state, action) => ({
    ...initialState,
    status: 'loading' as StatusProcess,
  })),
  on(OrderDetailActions.getOrderDetail_success, (state, action) => ({
    ...state,
    orderDetail: action.data,
    message: action.message,
    status: 'loaded' as StatusProcess,
  })),
  on(OrderDetailActions.getOrderDetail_failure, (state, action) => ({
    ...state,
    errMessage: action.errMessage,
    status: 'error' as StatusProcess,
  })),
  on(OrderDetailActions.resetStateOrderDetail, () => ({...initialState}))
  
);

export const orderDetailFeature = createFeature({
  name: feature_key['orderDetailFeature'],
  reducer,
  extraSelectors: ({selectOrderDetail}) => ({
    selectTotalQuantity: createSelector(
        selectOrderDetail, (orderDetail) => {
          return Array.isArray(orderDetail?.orderDetails)
            ? orderDetail.orderDetails.reduce((acc: any, init: any) => init.quantity + acc, 0)
            : 0;
      }
    )
  })
});

export const { selectOrderDetail, selectTotalQuantity} = orderDetailFeature;
