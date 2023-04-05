import { TestBed } from '@angular/core/testing';

import { InstaUserService } from './insta-user.service';

describe('InstaUserService', () => {
  let service: InstaUserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InstaUserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
