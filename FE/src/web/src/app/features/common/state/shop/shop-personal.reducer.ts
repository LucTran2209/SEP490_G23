import { createFeature, createReducer, on } from '@ngrx/store';
import { StatusProcess } from '../../../../interfaces/anonymous.interface';
import { ProductItemResponse } from '../../../../interfaces/product.interface';
import * as RentalShopProductActions from './shop-personal.actions';
import { feature_key } from '../../../../configs/feature_key.config';
export interface RentalShopProductState {
  message: string | null;
  status: StatusProcess;
  shopId: string;
  data: ProductItemResponse[];
  pageIndex: number;
  pageSize: number;
  totalCount: number;
  params: any;
}

const intialState: RentalShopProductState = {
  data: [],
  message: '',
  pageIndex: 0,
  totalCount: 0,
  shopId: '',
  pageSize: 0,
  status: 'idle',
  params: null,
};

export const rentalShopProductReducer = createReducer(
  intialState,
  on(RentalShopProductActions.getListProductRentalShop, (state, action) => ({
    ...state,
    params: action.params,
    shopId: action.shopId,
    status: 'loading' as StatusProcess,
  })),
  on(
    RentalShopProductActions.getListProductRentalShop_success,
    (state, action) => ({
      ...state,
      status: 'loaded' as StatusProcess,
      data: action.data,
      pageIndex: action.pageIndex ?? 0,
      pageSize: action.pageSize ?? 0,
      totalCount: action.totalCount ?? 0,
    })
  ),
  on(
    RentalShopProductActions.getListProductRentalShop_failure,
    (state, action) => ({
      ...state,
      status: 'error' as StatusProcess,
      message: action.message,
    })
  )
);

export const featureRentalShopProduct = createFeature({
  name: feature_key['rentalShopProductFeature'],
  reducer: rentalShopProductReducer,
});

export const {
  name,
  selectData,
  selectFeature_rentalShopProductState,
  selectMessage,
  selectPageIndex,
  selectPageSize,
  selectParams,
  selectStatus,
  selectTotalCount,
} = featureRentalShopProduct;
