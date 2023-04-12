import { TestBed } from '@angular/core/testing';

import { JoinCollectionService } from './join-collection.service';

describe('JoinCollectionService', () => {
  let service: JoinCollectionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JoinCollectionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
