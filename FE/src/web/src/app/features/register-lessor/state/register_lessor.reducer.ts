import { createFeature, createReducer, on } from '@ngrx/store';
import { StatusProcess } from '../../../interfaces/anonymous.interface';
import * as RegisterLessorActions from './register_lessor.actions';
import { feature_key } from '../../../configs/feature_key.config';
import { IAddressDeep } from '../../../interfaces/register-lessor.interface';

export interface IRegisterLessorState {
  shopName: string;
  imageFront: string;
  imageBack: string;
  imageFileFront: File | null;
  imageFileBack: File | null;
  taxNumber: string;
  businessLicense: File | null;
  rentalScale: string | number;
  // address: IAddressDeep;
  address: string;
  phoneNumber: string;
  email: string;
  isActive: boolean;
  description: string;
  status: StatusProcess;
  message: string;
}

const initialValue: IRegisterLessorState = {
  shopName: '',
  imageFront: '',
  imageBack: '',
  imageFileFront: null,
  imageFileBack: null,
  taxNumber: '',
  businessLicense: null,
  rentalScale: '0',
  address: '',
  // address: {
  //   address_district: {
  //     id: '',
  //     name: '',
  //   },
  //   address_province: {
  //     id: '',
  //     name: '',
  //   },
  //   address_ward: {
  //     id: '',
  //     name: '',
  //   },
  // },
  phoneNumber: '',
  email: '',
  isActive: false,
  description: '',
  status: 'idle',
  message: ''
};

export const reducerRegisterLessor = createReducer(
  initialValue,
  on(RegisterLessorActions.stepInfo, (state, action) => ({
    ...state,
    shopName: action.content.shopName,
    email: action.content.email,
    phoneNumber: action.content.phoneNumber,
  })),
  on(RegisterLessorActions.stepInfoCard, (state, {content}) => ({
    ...state,
    imageBack: content.imageBack,
    imageFront: content.imageFront,
    imageFileBack: content.imageFileBack,
    imageFileFront: content.imageFileFront,
  })),
  on(RegisterLessorActions.stepInfoTax, (state, action) => ({
    ...state,
    businessLicense: action.content.businessLicense,
    address: action.content.address,
    taxNumber: action.content.taxNumber,
    rentalScale: action.content.rentalScale,
    description: action.content.description,
  })),
  on(RegisterLessorActions.renterShop, (state, action) => ({
    ...state,
    status: 'loading' as StatusProcess
  })),
  on(RegisterLessorActions.renterShop_success, (state, action) => ({
    ...state,
    status: 'loaded' as StatusProcess,
    message: action.message
  })),
  on(RegisterLessorActions.renterShop_failure, (state, action) => ({
    ...state,
    status: 'error' as StatusProcess,
    message: action.message
  }))
);

export const featureRegisterLessor = createFeature({
  name: feature_key['registerLessorFeature'],
  reducer: reducerRegisterLessor,
});

export const {
  selectAddress,
  selectBusinessLicense,
  selectDescription,
  selectEmail,
  selectFeature_registerLessorState,
  selectImageBack,
  selectImageFront,
  selectImageFileBack,
  selectImageFileFront,
  selectIsActive,
  selectPhoneNumber,
  selectRentalScale,
  selectShopName,
  selectStatus,
  selectTaxNumber,
} = featureRegisterLessor;
