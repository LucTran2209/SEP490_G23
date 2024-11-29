export interface IRequestRegisterLessor_Step1 {
  shopName: string;
  email: string;
  phoneNumber: string;
}
export interface IRequestRegisterLessor_Step2 {
  imageFront: string;
  imageBack: string;
  imageFileFront: File;
  imageFileBack: File;
}
export interface IRequestRegisterLessor_Step3 {
  taxNumber: string;
  businessLicense: File | null;
  rentalScale: string | number;
  // address: IAddressDeep;
  address: string;
  description: string;
}
interface IAddress {
    id: string,
    name: string
}
export interface IAddressDeep {
  address_province: IAddress;
  address_district: IAddress;
  address_ward: IAddress;
}
export interface IRequestRegisterLessor
  extends IRequestRegisterLessor_Step1,
    IRequestRegisterLessor_Step2,
    IRequestRegisterLessor_Step3 {}
