import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Department } from 'src/interfaces/models/department';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Driver } from 'src/interfaces/models/driver';
import { ProductiveDrivers } from 'src/interfaces/queryObjects/productiveDrivers';
import { NumberOfOrdersDepartment } from 'src/interfaces/queryObjects/numberOfOrdersDepartment';
import { NumberOfOrders } from 'src/interfaces/queryObjects/numberOfOrders';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {
  drivers: MatTableDataSource<ProductiveDrivers>;
  departments: NumberOfOrdersDepartment[];

  numberOfOrders: number;

  driverDisplayedColumns = [
    'Id',
    'Department',
    'Last Name',
    'First Name',
    'Middle Name',
    'Date of Birth',
    'Salary',
    'Shift'
  ];

  constructor(
    private http: HttpClient
  ) { }

  ngOnInit() {
    this.getNumberOfOrders();
    this.getDrivers();
    this.getDepartmentsNumberOfOrders();
  }

  getDrivers() {
    this.http.get<ProductiveDrivers[]>(environment.baseUrl + 'api/drivers/productive')
      .subscribe(result => {
        console.log(result);
        this.drivers = new MatTableDataSource<ProductiveDrivers>(result);
        console.log(this.drivers);
      });
  }

  getDepartmentsNumberOfOrders() {
    this.http.get<NumberOfOrdersDepartment[]>(environment.baseUrl + 'api/departments/number')
      .subscribe(result => {
        console.log(result);
        this.departments = result;
        console.log(this.drivers);
      });
  }

  getNumberOfOrders() {
    this.http.get<NumberOfOrders>(environment.baseUrl + 'api/orders/count')
    .subscribe(res => {
      this.numberOfOrders = res.number;
    });
  }

  countPercent(department: NumberOfOrdersDepartment) {
    return (department.number / this.numberOfOrders * 100).toPrecision(3);
  }

  getTime(dt: string) {
    return dt.substr(11);
  }

  getDate(dt: string) {
    return dt.substr(0, 10);
  }
}
