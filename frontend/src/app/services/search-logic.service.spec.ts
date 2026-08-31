import { TestBed } from '@angular/core/testing';

import { SearchLogicService } from './search-logic.service';

describe('SearchLogicService', () => {
  let service: SearchLogicService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SearchLogicService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
