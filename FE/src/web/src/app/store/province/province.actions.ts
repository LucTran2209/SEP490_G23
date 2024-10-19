import { createAction, props } from '@ngrx/store';
import { Province } from '../../interfaces/province.interface';

export const PROVINCE_INIT = '[address vietnam] init province';
export const PROVINCE_OK = '[address vietnam] success provice';
export const PROVINCE_FAILURE = '[address vietnam] failure provice';
export const DISTRICT_INIT = '[address vietnam] init disctrict';
export const DISTRICT_OK = '[address vietnam] success disctrict';
export const DISTRICT_FAILURE = '[address vietnam] failure district';
export const WARD_OR_COMMUNE_INIT = '[address vietnam] init ward or commune';
export const WARD_OR_COMMUNE_OK = '[address vietnam] success ward or commune';
export const WARD_OR_COMMUNE_FAILURE =
  '[address vietnam] failure ward or commune';

export const getProvince = createAction(PROVINCE_INIT);
export const getProvince_success = createAction(
  PROVINCE_OK,
  props<{ dataP: Province[] | [] }>()
);
export const getProvince_failure = createAction(
  PROVINCE_FAILURE,
  props<{ errorMessage: string }>()
);

export const getDistrict = createAction(
  DISTRICT_INIT,
  props<{ id: string | number }>()
);
export const getDistrict_success = createAction(
  DISTRICT_OK,
  props<{ dataD: Province[] | [] }>()
);
export const getDistrict_failure = createAction(
  DISTRICT_FAILURE,
  props<{ errorMessage: string }>()
);

export const getWardOrCommume = createAction(
  WARD_OR_COMMUNE_INIT,
  props<{ id: string | number }>()
);
export const getWardOrCommume_success = createAction(
  WARD_OR_COMMUNE_OK,
  props<{ dataW: Province[] | [] }>()
);
export const getWardOrCommume_failure = createAction(
  WARD_OR_COMMUNE_FAILURE,
  props<{ errorMessage: string }>()
);
