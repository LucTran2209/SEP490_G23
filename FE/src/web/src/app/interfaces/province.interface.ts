export interface Province {
  id: string;
  name: string;
  name_en: string;
  full_name: string;
  full_name_en: string;
  latitude: string;
  longitude: string;
}

export interface ResponseAddressEsgoo {
  error: number;
  error_text: string;
  data_name: string;
  data: Province[];
}
