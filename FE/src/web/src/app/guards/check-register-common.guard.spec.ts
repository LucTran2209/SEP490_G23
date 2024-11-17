import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { checkRegisterCommonGuard } from './check-register-common.guard';

describe('checkRegisterCommonGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => checkRegisterCommonGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
