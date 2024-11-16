import { TestBed } from '@angular/core/testing';
import { CanDeactivateFn } from '@angular/router';

import { warningOutRegisterGuard } from './warning-out-register.guard';

describe('warningOutRegisterGuard', () => {
  const executeGuard: CanDeactivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => warningOutRegisterGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
