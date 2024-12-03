export const feature_key = {
  authFeature: 'feature_auth',
  userFeature: 'feature_user',
  adminFeature: 'feature_admin',
  addressVNFeature: 'feature_addressVN',
  registerLessorFeature: 'feature_registerLessor',
  rentalShopProductFeature: 'feature_rentalShopProduct',
  productDetailFeature: 'feature_productDetail',
  rentalProductFeature: 'feature_rentalProductFeature',
  filtersFeature: "feature_filter",
  orderProductFeature: "feature_orderProduct",
  resizeChatFeature: 'feature_resize',
  orderRequestFeature: 'feature_orderrequest',
  orderDetailFeature: 'feature_orderdetail',
  cardOverviewFeature: 'feature_CardOverView',
    dataChartSubCategory: 'feature_getDATACHARTSUBCATEGORY',
    dataChartRevenue: 'feature_getDATACHARTREVENUE',
    dataChartOrder: 'feature_getDATACHARTORDER'
} as const;

export type FeatureKeyValues = (typeof feature_key)[keyof typeof feature_key];

export const getFeatureKeyValue = (
  key: keyof typeof feature_key
): FeatureKeyValues => {
  return feature_key[key];
};

export const PRESISTED_STATE = [
  feature_key.authFeature,
  feature_key.addressVNFeature,
];
