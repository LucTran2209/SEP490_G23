import { createFeature, createReducer, on } from '@ngrx/store';
import { StatusProcess } from '../../interfaces/anonymous.interface';
import { Province } from '../../interfaces/province.interface';
import * as ProvinceActions from './province.actions';
import { getFeatureKeyValue } from '../../configs/feature_key.config';
export interface AddressProvinceVNState {
  statusProvince: StatusProcess;
  statusDistrict: StatusProcess;
  statusWard: StatusProcess;
  message: string;
  dataProvince: Province[] | [];
  dataDistrict: Province[] | [];
  dataWard: Province[] | [];
}

const initialValue: AddressProvinceVNState = {
  dataProvince: [],
  dataDistrict: [],
  dataWard: [],
  message: '',
  statusProvince: 'idle',
  statusDistrict: 'idle',
  statusWard: 'idle',
};

export const addressReducer = createReducer(
  initialValue,
  on(ProvinceActions.getProvince, (state) => ({
    ...state,
    message: '',
    statusProvince: 'loading' as StatusProcess,
  })),
  on(ProvinceActions.getProvince_success, (state, action) => ({
    ...state,
    dataProvince: action.dataP,
    statusProvince: 'loaded' as StatusProcess,
  })),
  on(ProvinceActions.getProvince_failure, (state, action) => ({
    ...state,
    message: action.errorMessage,
    statusProvince: 'error' as StatusProcess,
  })),
  on(ProvinceActions.getDistrict, (state) => ({
    ...state,
    message: '',
    statusDistrict: 'loading' as StatusProcess,
  })),
  on(ProvinceActions.getDistrict_success, (state, action) => ({
    ...state,
    dataDistrict: action.dataD,
    statusDistrict: 'loaded' as StatusProcess,
  })),
  on(ProvinceActions.getDistrict_failure, (state, action) => ({
    ...state,
    message: action.errorMessage,
    statusDistrict: 'error' as StatusProcess,
  })),
  on(ProvinceActions.getWardOrCommume, (state) => ({
    ...state,
    message: '',
    statusWard: 'loading' as StatusProcess,
  })),
  on(ProvinceActions.getWardOrCommume_success, (state, action) => ({
    ...state,
    dataWard: action.dataW,
    statusWard: 'loaded' as StatusProcess,
  })),
  on(ProvinceActions.getWardOrCommume_failure, (state, action) => ({
    ...state,
    message: action.errorMessage,
    statusWard: 'error' as StatusProcess,
  }))
);

export const addressFeature = createFeature({
  name: getFeatureKeyValue('addressVNFeature'),
  reducer: addressReducer,
});

export const {
  selectDataDistrict,
  selectDataProvince,
  selectDataWard,
  selectStatusDistrict,
  selectStatusProvince,
  selectStatusWard,
} = addressFeature;
