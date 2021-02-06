import { TestBed } from '@angular/core/testing';

import { UsreServiceService } from './usre-service.service';

describe('UsreServiceService', () => {
  let service: UsreServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UsreServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
