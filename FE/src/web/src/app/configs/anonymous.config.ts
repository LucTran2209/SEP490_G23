import { USER_ROLE } from '../utils/constant';

export const MappingLinkAfterLoginByRoles = {
  [USER_ROLE.ADMIN]: 'home',
  [USER_ROLE.RENTER]: 'home',
  [USER_ROLE.LESSOR]: 'home',
  [USER_ROLE.MODERATOR]: 'home',
};

export interface RouteData {
  expectedRole?: string[];
}
