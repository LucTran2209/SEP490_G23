import { createFeature, createReducer, createSelector, on } from '@ngrx/store';
import { feature_key } from '../../../../configs/feature_key.config';
import { StatusProcess } from '../../../../interfaces/anonymous.interface';
import * as ChartTopSubCategoryActions from './chartTopSubCategory-overview.actions';
export interface IDataChartSubCategoryState {
  data: any;
  status: StatusProcess;
  message: string | null;
}

const initialState: IDataChartSubCategoryState = {
  data: null,
  message: '',
  status: 'idle',
};

export const reducer = createReducer(
  initialState,
  on(ChartTopSubCategoryActions.getDATACHARTSUBCATEGORY, (state, action) => ({
    ...state,
    status: 'loading' as StatusProcess,
  })),
  on(ChartTopSubCategoryActions.getDATACHARTSUBCATEGORY_success, (state, action) => ({
    ...state,
    data: action.dataRes,
    message: action.message,
    status: 'loaded' as StatusProcess,
  })),
  on(ChartTopSubCategoryActions.getDATACHARTSUBCATEGORY_failure, (state, action) => ({
    ...state,
    status: 'error' as StatusProcess,
  })),
  on(ChartTopSubCategoryActions.getDATACHARTSUBCATEGORY_resetState, (state, action) => ({
    ...initialState,
  })),
);

export const feature_getDATACHARTSUBCATEGORY = createFeature({
  name: feature_key['dataChartSubCategory'],
  reducer,
});

export const {
  selectData,
  selectStatus,
  selectMessage,
} = feature_getDATACHARTSUBCATEGORY;


export const selectLabelsCategory = createSelector(
  selectData,
  (data) => {
    if (!data || !Array.isArray(data)) {
      return [];
    }
    return data.map((item: any) => item.subCategoryName);
  }
);
export const selectTotalsQuantity = createSelector(
  selectData,
  (data) => {
    if (!data || !Array.isArray(data)) {
      return [];
    }
    return data.map((item: any) => item.totalQuantity);
  }
);
