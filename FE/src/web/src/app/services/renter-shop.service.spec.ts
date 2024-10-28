import { TestBed } from '@angular/core/testing';

import { RenterShopService } from './renter-shop.service';

describe('RenterShopService', () => {
  let service: RenterShopService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RenterShopService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
