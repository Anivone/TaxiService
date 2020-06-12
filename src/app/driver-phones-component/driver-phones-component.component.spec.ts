import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DriverPhonesComponentComponent } from './driver-phones-component.component';

describe('DriverPhonesComponentComponent', () => {
  let component: DriverPhonesComponentComponent;
  let fixture: ComponentFixture<DriverPhonesComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DriverPhonesComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DriverPhonesComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
