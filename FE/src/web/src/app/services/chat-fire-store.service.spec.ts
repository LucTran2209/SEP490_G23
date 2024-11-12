import { TestBed } from '@angular/core/testing';

import { ChatFireStoreService } from './chat-fire-store.service';

describe('ChatFireStoreService', () => {
  let service: ChatFireStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChatFireStoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
