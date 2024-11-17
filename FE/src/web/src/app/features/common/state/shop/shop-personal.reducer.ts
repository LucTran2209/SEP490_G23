import { createFeature, createReducer, on } from '@ngrx/store';
import { StatusProcess } from '../../../../interfaces/anonymous.interface';
import { ProductItemResponse, ProductOutputDto } from '../../../../interfaces/product.interface';
import * as RentalShopProductActions from './shop-personal.actions';
import { feature_key } from '../../../../configs/feature_key.config';
export interface RentalShopProductState {
  message: string | null;
  status: StatusProcess;
  shopId: string;
  productItemResponse: ProductOutputDto[];
  pageIndex: number;
  pageSize: number;
  totalCount: number;
}

const intialState: RentalShopProductState = {
  pageIndex: 1,
  pageSize: 10,
  totalCount: 0,
  productItemResponse: [],
  message: '',
  shopId: '',
  status: 'idle',
};

export const rentalShopProductReducer = createReducer(
  intialState,
  on(RentalShopProductActions.getListProductRentalShop, (state, action) => ({
    ...state,
    shopId: action.shopId,
    status: 'loading' as StatusProcess,
  })),
  on(
    RentalShopProductActions.getListProductRentalShop_success,
    (state, { productData, pageIndex, pageSize, totalCount }) => ({
      ...state,
      status: 'loaded' as StatusProcess,
      pageIndex,
      pageSize,
      totalCount,
      productItemResponse: productData,
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
  selectFeature_rentalShopProductState,
  selectProductItemResponse,
  selectPageIndex,
  selectPageSize,
  selectShopId,
  selectTotalCount,
  selectMessage,
  selectStatus,
} = featureRentalShopProduct;
