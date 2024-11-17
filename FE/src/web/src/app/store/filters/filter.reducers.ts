import { createFeature, createReducer, on } from '@ngrx/store';
import * as FilterActions from './filter.actions';
import { feature_key } from '../../configs/feature_key.config';
export interface FilterParameters {
  pageSize: number;
  pageIndex: number;
  search: string;
  orderBy: string;
  orderByDesc: boolean;
  thenBy: string;
  thenByDesc: boolean;
}

const initalFilterState: FilterParameters = {
  pageSize: 10,
  pageIndex: 1,
  search: '',
  orderBy: '',
  orderByDesc: false,
  thenBy: '',
  thenByDesc: false,
};

export const filterReducers = createReducer(
  initalFilterState,
  on(FilterActions.updateFilter, (state, action) => ({
    ...state,
    ...action.filters,
  })),
  on(FilterActions.resetFilter, (state, action) => initalFilterState)
);

export const filterFeatures = createFeature({
  name: feature_key['filtersFeature'],
  reducer: filterReducers,
});

export const {
  selectFeature_filterState,
  selectOrderBy,
  selectOrderByDesc,
  selectPageIndex,
  selectPageSize,
  selectSearch,
  selectThenBy,
  selectThenByDesc,
} = filterFeatures;
