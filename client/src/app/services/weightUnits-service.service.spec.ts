import { TestBed } from '@angular/core/testing';

import { WeightUnitsService } from './weightUnits-service.service';

describe('WeightUnitServiceService', () => {
  let service: WeightUnitsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WeightUnitsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
