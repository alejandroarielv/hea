import { TestBed } from '@angular/core/testing';

import { LabelsService } from './labels-service.service';

describe('LabelServiceService', () => {
  let service: LabelsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LabelsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
