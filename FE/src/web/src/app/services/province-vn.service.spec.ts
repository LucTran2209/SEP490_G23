import { TestBed } from '@angular/core/testing';

import { ProvinceVnService } from './province-vn.service';

describe('ProvinceVnService', () => {
  let service: ProvinceVnService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProvinceVnService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
