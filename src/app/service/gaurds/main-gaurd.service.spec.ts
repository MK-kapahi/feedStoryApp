import { TestBed } from '@angular/core/testing';

import { MainGaurdService } from './main-gaurd.service';

describe('MainGaurdService', () => {
  let service: MainGaurdService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MainGaurdService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
