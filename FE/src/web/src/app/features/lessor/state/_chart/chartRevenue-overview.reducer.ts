import { createFeature, createReducer, createSelector, on } from '@ngrx/store';
import { feature_key } from '../../../../configs/feature_key.config';
import { StatusProcess } from '../../../../interfaces/anonymous.interface';
import * as ChartRevenueActions from './chartRevenue-overview.actions';
import { IDataChartSubCategoryState } from './chartTopSubCategory-overview.reducer';
export interface IDataChartRevenueState extends IDataChartSubCategoryState {
  typeOption: 'w' | 'm';
}

const initialState: IDataChartRevenueState = {
  data: null,
  message: '',
  typeOption: 'm',
  status: 'idle',
};

export const reducer = createReducer(
  initialState,
  on(ChartRevenueActions.getDATACHARTREVENUE, (state, action) => ({
    ...state,
    typeOption: action.typeOption,
    status: 'loading' as StatusProcess,
  })),
  on(ChartRevenueActions.getDATACHARTREVENUE_success, (state, action) => ({
    ...state,
    data: [...action.dataRes],
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
  extraSelectors: ({ selectData, selectTypeOption }) => ({
    selectArrLabelData: createSelector(
      selectData,
      selectTypeOption,
      (data, typeOption) => {
        if (!data || !Array.isArray(data)) return [];
        return data.map((item: any) => {
          if (typeOption === 'm') {
            return `Tháng ${item.month}/${item.year}`;
          } else {
            return `Tuần ${item.week}/${item.year}`;
          }
        });
      }
    ),
    selectArrTransactionData: createSelector(selectData, (data) => {
      if (!data || !Array.isArray(data)) return [];
      return data.map((item: any) => item.transactionCount);
    }),
    selectArrRevenueData: createSelector(selectData, (data) => {
      if (!data || !Array.isArray(data)) return [];
      return data.map((item: any) => item.totalRevenue);
    }),
  }),
});

export const {
  selectData,
  selectStatus,
  selectMessage,
  selectTypeOption,
  selectArrLabelData,
  selectArrRevenueData,
  selectArrTransactionData,
} = feature_getDATACHARTREVENUE;
