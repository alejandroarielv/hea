import { TestBed } from '@angular/core/testing';

import { BrandsService } from './brands-service.service';

describe('BrandServiceService', () => {
  let service: BrandsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BrandsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
