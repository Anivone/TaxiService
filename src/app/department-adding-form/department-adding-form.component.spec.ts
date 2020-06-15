import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DepartmentAddingFormComponent } from './department-adding-form.component';

describe('DepartmentAddingFormComponent', () => {
  let component: DepartmentAddingFormComponent;
  let fixture: ComponentFixture<DepartmentAddingFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DepartmentAddingFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DepartmentAddingFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
