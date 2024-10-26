import { TestBed } from '@angular/core/testing';

import { RentalTimerService } from './rental-timer.service';

describe('RentalTimerService', () => {
  let service: RentalTimerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RentalTimerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
