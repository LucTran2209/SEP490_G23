import { SELECT_FILTER_POST, VALUE_FILTER_POST } from "../interfaces/enum";
import { OptionSelect } from "./anonymous.config";

export const selectSortByOrderProduct: OptionSelect[] = [
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