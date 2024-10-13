import { USER_ROLE } from '../utils/constant';

export const MappingLinkAfterLoginByRoles = {
  [USER_ROLE.ADMIN]: 'common/home',
  [USER_ROLE.RENTER]: 'common/home',
  [USER_ROLE.LESSOR]: 'common/home',
  [USER_ROLE.MODERATOR]: 'common/home',
};

export interface RouteData {
  expectedRole?: string[];
}

export interface OptionSelect {
  label: string;
  value: string | number;
}

export interface OptionSelectCheckBox {
  label: string;
  value: string | number;
  checked: boolean;
}

export interface IITemListNav {
  label: string;
  href: string;
}

export interface IIRateStar {
  level: number;
  text?: string;
}
