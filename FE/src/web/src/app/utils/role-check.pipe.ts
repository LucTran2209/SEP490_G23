import { Pipe, PipeTransform } from '@angular/core';
import { USER_ROLE } from './constant';

@Pipe({
  name: 'roleCheck'
})
export class RoleCheckPipe implements PipeTransform {
  transform(userRole: number, roleToCheck: USER_ROLE): boolean {
    return userRole === roleToCheck;
  }
}