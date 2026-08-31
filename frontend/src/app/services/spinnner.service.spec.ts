import { TestBed } from '@angular/core/testing';

import { SpinnnerService } from './spinnner.service';

describe('SpinnnerService', () => {
  let service: SpinnnerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SpinnnerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
