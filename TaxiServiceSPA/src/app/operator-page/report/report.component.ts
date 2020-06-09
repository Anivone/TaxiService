import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Department } from 'src/interfaces/models/department';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Driver } from 'src/interfaces/models/driver';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {
  showDepartment = false;
  showDriver = false;

  departments: MatTableDataSource<Department>;

  drivers: MatTableDataSource<Driver>;

  driverDisplayedColumns = [
    'Id',
    'Department Id',
    'Car Id',
    'Last Name',
    'First Name',
    'Middle Name',
    'Date of Birth',
    'Region',
    'City',
    'Street',
    'Building',
    'Flat',
    'Beginning',
    'Ending',
    'Salary',
    'Available'
  ];

  departmentDisplayedColumns = ['Department Id', 'City'];
  constructor(
    private http: HttpClient
  ) { }

  ngOnInit() {
    this.getDepartments();
    this.getDrivers();
  }

  getDepartments() {
    this.http
      .get<Department[]>(environment.baseUrl + 'api/departments/productive')
      .subscribe((result) => {
        this.departments = new MatTableDataSource<Department>(result);
        console.log(this.departments);
      });
  }

  getDrivers() {
    this.http.get<Driver[]>(environment.baseUrl + 'api/drivers/productive')
      .subscribe(result => {
        this.drivers = new MatTableDataSource<Driver>(result);
        console.log(this.drivers);
      });
  }

  showDeparments() {
    this.showDepartment = true;
    this.showDriver = false;
  }

  showDrivers() {
    this.showDepartment = false;
    this.showDriver = true;
  }

  getTime(dt: string) {
    return dt.substr(11);
  }

  getDate(dt: string) {
    return dt.substr(0, 10);
  }
}
