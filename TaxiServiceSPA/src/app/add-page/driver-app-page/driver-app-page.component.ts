import { Component, OnInit, Inject, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ENTER, COMMA } from '@angular/cdk/keycodes';
import { NewOrderDto } from 'src/interfaces/dto/newOrderDto';
import { environment } from 'src/environments/environment';
import { MatChipInputEvent } from '@angular/material/chips';
import { HttpClient } from '@angular/common/http';
import { Driver } from 'src/interfaces/models/driver';
import { Car } from 'src/interfaces/models/car';
import { Department } from 'src/interfaces/models/department';
import { DriverPhones } from 'src/interfaces/models/driver-phones';
import { UserToRegister } from 'src/interfaces/models/userToRegister';

@Component({
  selector: 'app-driver-app-page',
  templateUrl: './driver-app-page.component.html',
  styleUrls: ['./driver-app-page.component.css']
})
export class DriverAppPageComponent implements OnInit {
  driverForm: FormGroup;
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];

  phones: string[] = [];
  cars: Car[];
  departments: Department[];

  @Input() public editDriver: Driver;

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient
  ) { }

  ngOnInit() {
    console.log(this.editDriver);
    this.driverForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      middleName: ['', Validators.required],
      lastName: ['', Validators.required],
      carId: (this.editDriver) ? [''] : ['', Validators.required],
      birthDate: ['', Validators.required],
      personalPhone: (this.editDriver) ? [''] : ['', Validators.required],
      departmentId: ['', Validators.required],
      region: ['', Validators.required],
      city: ['', Validators.required],
      building: ['', Validators.required],
      street: ['', Validators.required],
      flat: [''],
      shiftTime: ['', Validators.required],
    });

    this.http.get<Car[]>(environment.baseUrl + 'api/cars/available')
      .subscribe(result => {
        this.cars = result;
      });

    this.http.get<Department[]>(environment.baseUrl + 'api/departments')
      .subscribe(result => {
        this.departments = result;
      });

    if (this.editDriver) {
      this.driverForm.controls.firstName.setValue(this.editDriver.firstName);
      this.driverForm.controls.lastName.setValue(this.editDriver.lastName);
      this.driverForm.controls.middleName.setValue(this.editDriver.middleName);
      this.driverForm.controls.carId.setValue(this.editDriver.carId);
      this.driverForm.controls.departmentId.setValue(this.editDriver.departmentId);
      this.driverForm.controls.birthDate.setValue(this.editDriver.dateOfBirth);
      this.driverForm.controls.region.setValue(this.editDriver.region);
      this.driverForm.controls.city.setValue(this.editDriver.city);
      this.driverForm.controls.building.setValue(this.editDriver.building);
      this.driverForm.controls.street.setValue(this.editDriver.street);
      this.driverForm.controls.flat.setValue(this.editDriver.flat);
    }
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
  addDriver() {
    console.log(this.driverForm.value);
    console.log(this.phones);
    const shift: string = this.driverForm.value.shiftTime;
    const begin = `1900-01-01T${shift.substr(0, 5)}:00`;
    const end = `1900-01-01T${shift.substr(shift.length - 5, 5)}:00`;
    this.http.post<Driver>(environment.baseUrl + 'api/drivers', {
      carId: this.driverForm.value.carId,
      departmentId: parseInt(this.driverForm.value.departmentId, 10),
      lastName: this.driverForm.value.lastName,
      firstName: this.driverForm.value.firstName,
      middleName: this.driverForm.value.middleName,
      dateOfBirth: this.driverForm.value.birthDate,
      region: this.driverForm.value.region,
      city: this.driverForm.value.city,
      street: this.driverForm.value.street,
      building: this.driverForm.value.building,
      flat: parseInt(this.driverForm.value.flat, 10),
      beginning: begin,
      ending: end,
      available: true,
      salary: (shift.substr(0, 5) === '08:00') ? 0 : 2500
    }).subscribe(result => {
      console.log(result);
      this.http.get<Driver>(environment.baseUrl + 'api/drivers/recent')
        .subscribe(driver => {
          this.phones.forEach(phone => {
            this.http.post<DriverPhones>(environment.baseUrl + 'api/driverphones', {
              phoneNumber: phone,
              driverId: driver.driverId
            }).subscribe(res => console.log(res));
          });
        });
    });
  }

  updateDriver() {
    console.log(this.driverForm.value);
    console.log(this.phones);
    const shift: string = this.driverForm.value.shiftTime;
    const begin = `1900-01-01T${shift.substr(0, 5)}:00`;
    const end = `1900-01-01T${shift.substr(shift.length - 5, 5)}:00`;
    this.http.put<Driver>(environment.baseUrl + `api/drivers/${this.editDriver.driverId}`, {
      driverId: this.editDriver.driverId,
      carId: this.driverForm.value.carId,
      departmentId: parseInt(this.driverForm.value.departmentId, 10),
      lastName: this.driverForm.value.lastName,
      firstName: this.driverForm.value.firstName,
      middleName: this.driverForm.value.middleName,
      dateOfBirth: this.driverForm.value.birthDate,
      region: this.driverForm.value.region,
      city: this.driverForm.value.city,
      street: this.driverForm.value.street,
      building: this.driverForm.value.building,
      flat: parseInt(this.driverForm.value.flat, 10),
      beginning: begin,
      ending: end,
      salary: (shift.substr(0, 5) === '08:00') ? 0 : 2500
    }).subscribe(result => {
      console.log(result);
      this.http.get<Driver>(environment.baseUrl + 'api/drivers/recent')
        .subscribe(driver => {
          this.phones.forEach(phone => {
            this.http.post<DriverPhones>(environment.baseUrl + 'api/driverphones', {
              phoneNumber: phone,
              driverId: driver.driverId
            }).subscribe(res => console.log(res));
          });
        });
    });

  }
}

