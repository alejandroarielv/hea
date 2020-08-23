import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShippingTypeListComponent } from './shippingType-list.component';

describe('ShippingTypeListComponent', () => {
  let component: ShippingTypeListComponent;
  let fixture: ComponentFixture<ShippingTypeListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShippingTypeListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShippingTypeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
