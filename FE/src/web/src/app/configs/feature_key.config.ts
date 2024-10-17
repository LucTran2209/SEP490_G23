export const feature_key = {
  authFeature: 'feature_auth',
  userFeature: 'feature_user',
  adminFeature: 'feature_admin',
  addressVNFeature: 'feature_addressVN',
} as const;

export type FeatureKeyValues = (typeof feature_key)[keyof typeof feature_key];

export const getFeatureKeyValue = (
  key: keyof typeof feature_key
): FeatureKeyValues => {
  return feature_key[key];
};
