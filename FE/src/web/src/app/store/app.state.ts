import { AuthState } from '../features/auth/state/auth.state';
import { ProductDetailState } from '../features/common/state/product/product-detail.reducer';
import { RentalOrderState } from '../features/common/state/rental/rental.reducers';
import { RentalShopProductState } from '../features/common/state/shop/shop-personal.reducer';
import { IRegisterLessorState } from '../features/register-lessor/state/register_lessor.reducer';
import { AddressProvinceVNState } from './province/province.reducer';

export interface FeatureAppState {
  featureAuth: AuthState;
  featureRegisterLessor: IRegisterLessorState,
  featureRentalShopProduct: RentalShopProductState,
  featureProductDetailRental: ProductDetailState,
  featureRentalProduct: RentalOrderState,
}

export interface AppState {}

export interface GlobalState {
  featureAuth: AuthState;
  featureAddress: AddressProvinceVNState;
}
