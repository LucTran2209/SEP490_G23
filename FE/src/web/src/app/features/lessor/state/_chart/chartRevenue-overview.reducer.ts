import { createFeature, createReducer, on } from '@ngrx/store';
import { feature_key } from '../../../../configs/feature_key.config';
import { StatusProcess } from '../../../../interfaces/anonymous.interface';
import * as ChartRevenueActions from './chartRevenue-overview.actions';
import { IDataChartSubCategoryState } from './chartTopSubCategory-overview.reducer';
export interface IDataChartRevenueState extends IDataChartSubCategoryState {}

const initialState: IDataChartRevenueState = {
  data: null,
  message: '',
  status: 'idle',
};

export const reducer = createReducer(
  initialState,
  on(ChartRevenueActions.getDATACHARTREVENUE, (state, action) => ({
    ...state,
    status: 'loading' as StatusProcess,
  })),
  on(ChartRevenueActions.getDATACHARTREVENUE_success, (state, action) => ({
    ...state,
    data: action.dataRes,
    message: action.message,
    status: 'loaded' as StatusProcess,
  })),
  on(ChartRevenueActions.getDATACHARTREVENUE_failure, (state, action) => ({
    ...state,
    status: 'error' as StatusProcess,
  })),
  on(ChartRevenueActions.getDATACHARTREVENUE_resetState, (state, action) => ({
    ...initialState,
  }))
);

export const feature_getDATACHARTREVENUE = createFeature({
  name: feature_key['dataChartRevenue'],
  reducer,
});

export const { selectData, selectStatus, selectMessage } =
  feature_getDATACHARTREVENUE;
