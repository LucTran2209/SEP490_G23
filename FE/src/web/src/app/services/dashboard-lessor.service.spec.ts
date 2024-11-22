import { TestBed } from '@angular/core/testing';

import { DashboardLessorService } from './dashboard-lessor.service';

describe('DashboardLessorService', () => {
  let service: DashboardLessorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DashboardLessorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
