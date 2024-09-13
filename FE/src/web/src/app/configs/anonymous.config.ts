import { USER_ROLE } from "../utils/constant";

export const MappingLinkAfterLoginByRoles = {
    [USER_ROLE.ADMIN]: 'admin',
  };
  

  export interface RouteData {
    expectedRole?: string[];
  }