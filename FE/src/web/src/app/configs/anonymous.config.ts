import { USER_ROLE } from '../utils/constant';

export const MappingLinkAfterLoginByRoles = {
  [USER_ROLE.ADMIN]: 'admin',
  [USER_ROLE.LESSEE]: 'test',
  [USER_ROLE.LESSOR]: '',
  [USER_ROLE.MODERATOR]: '',
};

export interface RouteData {
  expectedRole?: string[];
}
