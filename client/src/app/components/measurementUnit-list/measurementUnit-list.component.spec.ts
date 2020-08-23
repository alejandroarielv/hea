import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MeasurementUnitListComponent } from './measurementUnit-list.component';

describe('MeasurementUnitListComponent', () => {
  let component: MeasurementUnitListComponent;
  let fixture: ComponentFixture<MeasurementUnitListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MeasurementUnitListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MeasurementUnitListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
