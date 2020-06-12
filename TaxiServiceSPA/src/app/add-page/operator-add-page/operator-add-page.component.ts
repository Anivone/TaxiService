import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ENTER, COMMA } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatDialog } from '@angular/material/dialog';
import { AddPageComponent } from '../add-page.component';
import { Client } from 'src/interfaces/models/client';
import { environment } from 'src/environments/environment';
import { Operator } from 'src/interfaces/models/operator';
import { HttpClient } from '@angular/common/http';
import { OperatorPhones } from 'src/interfaces/models/operator-phones';
import { Department } from 'src/interfaces/models/department';

@Component({
  selector: 'app-operator-add-page',
  templateUrl: './operator-add-page.component.html',
  styleUrls: ['./operator-add-page.component.css']
})
export class OperatorAddPageComponent implements OnInit {

  public operatorForm: FormGroup;
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];

  @Input() public editOperator: Operator;
  public departments: Department[];

  phones: string[] = [];
  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.operatorForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      middleName: ['', Validators.required],
      lastName: ['', Validators.required],
      birthDate: ['', Validators.required],
      personalPhone: (this.editOperator) ? [''] : ['', Validators.required],
      workingPhone: ['', Validators.required],
      departmentId: ['', Validators.required],
      region: ['', Validators.required],
      city: ['', Validators.required],
      building: ['', Validators.required],
      street: ['', Validators.required],
      flat: [''],
      shiftTime: ['', Validators.required],
    });

    this.operatorForm.controls.firstName.setValue(this.editOperator.firstName);
    this.operatorForm.controls.lastName.setValue(this.editOperator.lastName);
    this.operatorForm.controls.middleName.setValue(this.editOperator.middleName);
    this.operatorForm.controls.departmentId.setValue(this.editOperator.departmentId);
    this.operatorForm.controls.birthDate.setValue(this.editOperator.dateOfBirth);
    this.operatorForm.controls.workingPhone.setValue(this.editOperator.workingPhone);
    this.operatorForm.controls.region.setValue(this.editOperator.region);
    this.operatorForm.controls.city.setValue(this.editOperator.city);
    this.operatorForm.controls.building.setValue(this.editOperator.building);
    this.operatorForm.controls.street.setValue(this.editOperator.street);

    this.http.get<Department[]>(environment.baseUrl + 'api/departments')
      .subscribe(result => {
        this.departments = result;
      });
  }

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our phone
    if ((value || '').trim()) {
      this.phones.push(value.trim());
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }
  remove(phone: string): void {
    const index = this.phones.indexOf(phone);

    if (index >= 0) {
      this.phones.splice(index, 1);
    }
  }

  addOperator() {
    const shift: string = this.operatorForm.value.shiftTime;
    const begin = `1900-01-01T${shift.substr(0, 5)}:00`;
    const end = `1900-01-01T${shift.substr(shift.length - 5, 5)}:00`;
    this.http.post<Operator>(environment.baseUrl + 'api/operators', {
      departmentId: parseInt(this.operatorForm.value.departmentId, 10),
      lastName: this.operatorForm.value.lastName,
      firstName: this.operatorForm.value.firstName,
      middleName: this.operatorForm.value.middleName,
      dateOfBirth: this.operatorForm.value.birthDate,
      workingPhone: this.operatorForm.value.workingPhone,
      region: this.operatorForm.value.region,
      city: this.operatorForm.value.city,
      street: this.operatorForm.value.street,
      building: this.operatorForm.value.building,
      flat: parseInt(this.operatorForm.value.flat, 10),
      beginning: begin,
      ending: end,
      salary: (shift.substr(0, 5) === '08:00') ? 12000 : 14000
    }).subscribe(result => {
      this.phones.forEach(phone => {
        this.http.post<OperatorPhones>(environment.baseUrl + 'api/operator-phones-list', {
          phoneNumber: phone,
          operatorId: result.operatorId
        });
      });
    });
  }
    updateOperator() {
      const shift: string = this.operatorForm.value.shiftTime;
      const begin = `1900-01-01T${shift.substr(0, 5)}:00`;
      const end = `1900-01-01T${shift.substr(shift.length - 5, 5)}:00`;
      this.http.put<Operator>(environment.baseUrl + `api/operators/${this.editOperator.operatorId}`, {
        operatorId: this.editOperator.operatorId,
        departmentId: parseInt(this.operatorForm.value.departmentId, 10),
        lastName: this.operatorForm.value.lastName,
        firstName: this.operatorForm.value.firstName,
        middleName: this.operatorForm.value.middleName,
        dateOfBirth: this.operatorForm.value.birthDate,
        workingPhone: this.operatorForm.value.workingPhone,
        region: this.operatorForm.value.region,
        city: this.operatorForm.value.city,
        street: this.operatorForm.value.street,
        building: this.operatorForm.value.building,
        flat: parseInt(this.operatorForm.value.flat, 10),
        beginning: begin,
        ending: end,
        salary: (shift.substr(0, 5) === '08:00') ? 12000 : 14000
      }).subscribe(result => {
        this.phones.forEach(phone => {
          this.http.post<OperatorPhones>(environment.baseUrl + 'api/operator-phones-list', {
            phoneNumber: phone,
            operatorId: result.operatorId
          });
        });
      });
  }
}
