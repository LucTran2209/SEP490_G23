export interface IDummy {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any;
  }
  
  
  export interface BaseDropDown {
    name: string;
    code: string;
  }

  
  export interface SELECTBUTTON {
    label: string, 
    value: string

  }

  export interface ItimeClock {
    hours?: string,
    minutes?: string,
    seconds?: string
  }

export type StatusProcess = 'idle' | 'loading' | 'loaded' | 'error';