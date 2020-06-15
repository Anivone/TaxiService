import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ENTER, COMMA } from '@angular/cdk/keycodes';
import { HttpClient } from '@angular/common/http';
import { MatChipInputEvent } from '@angular/material/chips';
import { DriverPhones } from 'src/interfaces/models/driver-phones';
import { environment } from 'src/environments/environment';
import { Driver } from 'src/interfaces/models/driver';

@Component({
  selector: 'app-driver-phones-add-page',
  templateUrl: './driver-phones-add-page.component.html',
  styleUrls: ['./driver-phones-add-page.component.css']
})
export class DriverPhonesAddPageComponent implements OnInit {

  driverPhonesForm: FormGroup;

  valid = true;
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  num: number;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  phones: any[] = [];

  public drivers: Driver[];

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient

  ) { }

  ngOnInit() {
    this.driverPhonesForm = this.formBuilder.group({
      tNumber: ['', Validators.required],
      personalPhone: ['', Validators.required]
    });

    this.http.get<Driver[]>(environment.baseUrl + 'api/drivers')
      .subscribe(result => {
        this.drivers = result;
      });
  }

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    if ((value || '').trim()) {
      this.phones.push(value);

    }

    if (input) {
      input.value = '';
    }
  }

  remove(phone: any): void {


    const index = this.phones.indexOf(phone);

    if (index >= 0) {
      this.phones.splice(index, 1);
    }
  }

  isValid() {
    const reg = /^\d+$/;

    for (const index in this.phones) {
      if (reg.test(this.phones[index]) || this.phones.length === 0) {
        this.valid = true;
      } else {
        this.valid = false;
      }
    }
    if (this.phones.length === 0) {
      this.valid = true;
    }
  }
  onSubmit() {
    console.log(this.phones.length);
    this.http.post<DriverPhones>(environment.baseUrl + 'api/driversphones', {
      driverId: this.driverPhonesForm.value.tNumber,
      phoneNumber: this.phones


    }).subscribe(result => {
      console.log(result);

    }, err => console.log(err));

  }

}
