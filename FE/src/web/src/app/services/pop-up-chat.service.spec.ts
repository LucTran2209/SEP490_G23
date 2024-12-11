import { TestBed } from '@angular/core/testing';

import { PopUpChatService } from './pop-up-chat.service';

describe('PopUpChatService', () => {
  let service: PopUpChatService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PopUpChatService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
