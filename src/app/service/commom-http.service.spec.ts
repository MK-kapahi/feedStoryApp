import { TestBed } from '@angular/core/testing';

import { CommomHttpService } from './commom-http.service';

describe('CommomHttpService', () => {
  let service: CommomHttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CommomHttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
