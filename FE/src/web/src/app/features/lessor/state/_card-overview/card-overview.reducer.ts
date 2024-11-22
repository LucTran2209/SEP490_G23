import { createFeature, createReducer, on } from '@ngrx/store';
import { StatusProcess } from '../../../../interfaces/anonymous.interface';
import * as CardOverviewActions from './card-overview.actions';
import { feature_key } from '../../../../configs/feature_key.config';
export interface ICardOverviewState {
  data: any;
  status: StatusProcess;
  message: string | null;
}

const initialState: ICardOverviewState = {
  data: null,
  message: '',
  status: 'idle',
};

export const reducer = createReducer(
  initialState,
  on(CardOverviewActions.getAllCardOverview, (state, action) => ({
    ...state,
    status: 'loading' as StatusProcess,
  })),
  on(CardOverviewActions.getAllCardOverview_success, (state, action) => ({
    ...state,
    data: action.dataRes,
    message: action.message,
    status: 'loaded' as StatusProcess,
  })),
  on(CardOverviewActions.getAllCardOverview_failure, (state, action) => ({
    ...state,
    status: 'error' as StatusProcess,
  })),
  on(CardOverviewActions.getAllCardOverview_resetState, (state, action) => ({
    ...initialState,
  })),
);

export const feature_CardOverView = createFeature({
  name: feature_key['cardOverviewFeature'],
  reducer,
});

export const {
  selectData,
  selectFeature_CardOverViewState,
  selectStatus,
  selectMessage,
} = feature_CardOverView;
