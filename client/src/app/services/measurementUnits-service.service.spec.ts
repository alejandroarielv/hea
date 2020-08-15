import { TestBed } from '@angular/core/testing';

import { MeasurementUnitsService } from './measurementUnits-service.service';

describe('MeasurementUnitServiceService', () => {
  let service: MeasurementUnitsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MeasurementUnitsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
