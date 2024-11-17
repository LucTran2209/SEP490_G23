import { TestBed } from '@angular/core/testing';

import { RentalShopService } from './rental-shop.service';

describe('RentalShopService', () => {
  let service: RentalShopService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RentalShopService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
