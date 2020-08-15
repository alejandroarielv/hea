import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WeightUnitListComponent } from './weightUnit-list.component';

describe('WeightUnitListComponent', () => {
  let component: WeightUnitListComponent;
  let fixture: ComponentFixture<WeightUnitListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WeightUnitListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WeightUnitListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
