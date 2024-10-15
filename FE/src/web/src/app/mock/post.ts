import {
  IITemListNav,
  OptionSelect,
  OptionSelectCheckBox,
} from '../configs/anonymous.config';

export const allCategoryPostRental = [
  {
    label: 'Điện Thoại & Phụ Kiện',
    value: '1',
  },
  {
    label: 'Máy gia công ABC',
    value: '2',
  },

  {
    label: 'Súng & Áo Giáp',
    value: '3',
  },
  {
    label: 'Quần áo, giày dép',
    value: '4',
  },
];

export const selectLocationOptions: OptionSelectCheckBox[] = [
  { label: 'Hà Giang', value: 'Hà Giang', checked: false },
  { label: 'Hà Tây', value: 'Hà Tây', checked: false },
  { label: 'Hà Bắc', value: 'Hà Bắc', checked: false },
  { label: 'Hưng yên', value: 'Hưng yên', checked: false },
  { label: 'Bắc Ninh', value: 'Bắc Ninh', checked: false },
  { label: 'Bắc Giang', value: 'Bắc Giang', checked: false },
];
export const selectBranch: OptionSelectCheckBox[] = [
  { label: 'Nga ngố', value: 'Nga ngố', checked: false },
  { label: 'Tàu khựa', value: 'Tàu khựa', checked: false },
  { label: 'Mỹ mèo', value: 'Mỹ mèo', checked: false },
];
export const selectProductStatus: OptionSelectCheckBox[] = [
  { label: 'Mới 100%', value: 'new', checked: false },
  { label: 'Like new', value: 'like_new', checked: false },
  { label: 'Đã sử dụng (Còn tốt)', value: 'used_good', checked: false },
];

export const selectStatusProduct: OptionSelectCheckBox[] = [];
export const categoryOptions: IITemListNav[] = [
  {
    label: 'Thiết bị công nghiệp',
    href: '/Thiết bị công nghiệp',
  },
  {
    label: 'Thiết bị văn phòng',
    href: '/Thiết bị văn phòng',
  },
  {
    label: 'Thiết bị điện tử',
    href: '/Thiết bị điện tử',
  },
  {
    label: 'Xe cộ',
    href: '/Xe cộ',
  },
  {
    label: 'Thiết bị xây dựng',
    href: '/Thiết bị xây dựng',
  },
  {
    label: 'Thiết bị gia dụng',
    href: '/Thiết bị gia dụng',
  },
  {
    label: 'Thiết bị sự kiện',
    href: '/Thiết bị sự kiện',
  },
  {
    label: 'Thiết bị thể thao',
    href: '/Thiết bị thể thao',
  },
];
