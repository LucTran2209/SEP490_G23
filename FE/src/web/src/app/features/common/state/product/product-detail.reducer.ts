  import { createFeature, createReducer, on } from '@ngrx/store';
  import { StatusProcess } from '../../../../interfaces/anonymous.interface';
  import { ProductItemResponse } from '../../../../interfaces/product.interface';
  import * as ProductDetailActions from './product-detail.actions';
  import { feature_key } from '../../../../configs/feature_key.config';
  export interface ProductDetailState {
    message: string | null;
    status: StatusProcess;
    data: ProductItemResponse;
  }

  const intialState: ProductDetailState = {
    data: {
      id:"",
      depositPrice: "",
      description: "",
      evaluate: "",
      productImages: [],
      productName: "",
      quantity: 0,
      rentalLimitDays: 0,
      rentalPrice: 0,
      subCategory: {
        category: '',
        categoryId: "",
        createdBy: "",
        createdByName: "",
        createdDate: "",
        description: "",
        id:"",
        isDeleted: false,
        lastModifiedDate:"",
        modifiedBy:"",
        modifiedByName:"",
        products: [],
        subCategoryName: "",
      },
      subCategoryId: "",
    },
    message: '',
    status: 'idle',
  };

  export const productDetailReducer = createReducer(
    intialState,
    on(ProductDetailActions.getDetailProductRental, (state, action) => ({
      ...state,
      status: 'loading' as StatusProcess,
    })),
    on(ProductDetailActions.getDetailProductRental_success, (state, action) => ({
      ...state,
      status: 'loaded' as StatusProcess,
      data: action.data,
    })),
    on(ProductDetailActions.getDetailProductRental_failure, (state, action) => ({
      ...state,
      message: action.message,
      status: 'error' as StatusProcess,
    }))
  );

  export const featureProductDetail = createFeature({
    name: feature_key['productDetailFeature'],
    reducer: productDetailReducer,
  });

  export const {
    selectData,
    selectFeature_productDetailState,
    selectMessage,
    selectStatus,
  } = featureProductDetail;
