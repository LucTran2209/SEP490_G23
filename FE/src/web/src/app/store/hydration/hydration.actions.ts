import { createAction, props } from '@ngrx/store';
import { GlobalState } from '../app.state';

const SCANNER_HYDRATE = '[Hydration] scanner hydrate';
const HYDRATE_SUCCESS = '[Hydration] scanner hydrate success';
const HYDRATE_FAILURE = '[Hydration] scanner hydrate failure';

export const scanner_hydrate = createAction(SCANNER_HYDRATE);
export const scanner_hydrate_success = createAction(
  HYDRATE_SUCCESS,
  props<{ globalState: any }>()
);
export const scanner_hydrate_failure = createAction(HYDRATE_FAILURE);
