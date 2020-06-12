import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OperatorPhonesComponentComponent } from './operator-phones-component.component';

describe('OperatorPhonesComponentComponent', () => {
  let component: OperatorPhonesComponentComponent;
  let fixture: ComponentFixture<OperatorPhonesComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OperatorPhonesComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OperatorPhonesComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
