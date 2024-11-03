import { createAction, props } from '@ngrx/store';
import { FilterParameters } from './filter.reducers';

const UPDATE_FILTER = '[call api search filter] Update filters';
const RESET_FILTER = '[call api reset filter] Reset filters';

export const updateFilter = createAction(
  UPDATE_FILTER,
  props<{ filters: Partial<FilterParameters> }>()
);

export const resetFilter = createAction(RESET_FILTER);
