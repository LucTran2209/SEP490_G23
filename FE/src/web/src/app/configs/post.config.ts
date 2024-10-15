import { SELECT_FILTER_POST, VALUE_FILTER_POST } from '../interfaces/enum';
import { IIRateStar, OptionSelect } from './anonymous.config';

export const selectSortByOrder: OptionSelect[] = [
  {
    label: SELECT_FILTER_POST.NEWEST,
    value: VALUE_FILTER_POST.NEWEST,
  },
  {
    label: SELECT_FILTER_POST.OLDERST,
    value: VALUE_FILTER_POST.OLDERST,
  },
  {
    label: SELECT_FILTER_POST.PRICELH,
    value: VALUE_FILTER_POST.PRICELH,
  },
  {
    label: SELECT_FILTER_POST.PRICEHL,
    value: VALUE_FILTER_POST.PRICEHL,
  },
  {
    label: SELECT_FILTER_POST.HIGHESTRATE,
    value: VALUE_FILTER_POST.HIGHESTRATE,
  },
  {
    label: SELECT_FILTER_POST.MOSTPOPULAR,
    value: VALUE_FILTER_POST.MOSTPOPULAR,
  },
];

export const rateStar: IIRateStar[] = [
  {
    level: 5,
  },
  {
    level: 4,
    text: 'trở lên',
  },
  {
    level: 3,
    text: 'trở lên',
  },
  {
    level: 2,
    text: 'trở lên',
  },
  {
    level: 1,
    text: 'trở lên',
  },
];
