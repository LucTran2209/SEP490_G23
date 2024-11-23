import { createFeature, createReducer, on, createSelector } from '@ngrx/store';
import { feature_key } from '../../../../configs/feature_key.config';
import { StatusProcess } from '../../../../interfaces/anonymous.interface';
import * as ChartOrderActions from './chartOrder-overview.actions';
import { IDataChartSubCategoryState } from './chartTopSubCategory-overview.reducer';

export interface IDataChartOrderState extends IDataChartSubCategoryState {}

const initialState: IDataChartOrderState = {
  data: null,
  message: '',
  status: 'idle',
};

export const reducer = createReducer(
  initialState,
  on(ChartOrderActions.getDATACHARTORDER, (state, action) => ({
    ...state,
    status: 'loading' as StatusProcess,
  })),
  on(ChartOrderActions.getDATACHARTORDER_success, (state, action) => ({
    ...state,
    data: action.dataRes,
    message: action.message,
    status: 'loaded' as StatusProcess,
  })),
  on(ChartOrderActions.getDATACHARTORDER_failure, (state, action) => ({
    ...state,
    status: 'error' as StatusProcess,
  })),
  on(ChartOrderActions.getDATACHARTORDER_resetState, (state, action) => ({
    ...initialState,
  })),
);

export const feature_getDATACHARTORDER = createFeature({
  name: feature_key['dataChartOrder'],
  reducer,
});

export const {
  selectData,
  selectStatus,
  selectMessage,
} = feature_getDATACHARTORDER;

export const selectLabels = createSelector(
  selectData,
  (data) => {
    if (!data || !Array.isArray(data)) {
      return [];
    }
    return data.map((item: any) => `Tháng ${item.month} / ${item.year}`);
  }
);

export const selectWaitingForConfirm = createSelector(
  selectData,
  (data) => {
    if (!data || !Array.isArray(data)) {
      return [];
    }
    return data.map((item: any) => item.waitingForConfirm);
  }
);

export const selectInProcess = createSelector(
  selectData,
  (data) => {
    if (!data || !Array.isArray(data)) {
      return [];
    }
    return data.map((item: any) => item.inProgress);
  }
);
export const selectCompleted = createSelector(
  selectData,
  (data) => {
    if (!data || !Array.isArray(data)) {
      return [];
    }
    return data.map((item: any) => item.completed);
  }
);
export const selectCancel = createSelector(
  selectData,
  (data) => {
    if (!data || !Array.isArray(data)) {
      return [];
    }
    return data.map((item: any) => item.cancelled);
  }
);