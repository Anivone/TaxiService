import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Department } from 'src/interfaces/models/department';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Driver } from 'src/interfaces/models/driver';
import { ProductiveDrivers } from 'src/interfaces/queryObjects/productiveDrivers';
import { NumberOfOrdersDepartment } from 'src/interfaces/queryObjects/numberOfOrdersDepartment';
import { NumberOfOrders } from 'src/interfaces/queryObjects/numberOfOrders';
import { CreditCardDrivers } from 'src/interfaces/queryObjects/creditCardDrivers';
import { FlatBusinessDrivers } from 'src/interfaces/queryObjects/flatBusinessDrivers';
import { CheapDrivers } from 'src/interfaces/queryObjects/cheapDrivers';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {
  drivers: MatTableDataSource<ProductiveDrivers>;
  departments: NumberOfOrdersDepartment[];
  creditDrivers: MatTableDataSource<CreditCardDrivers>;
  prodDepartments: MatTableDataSource<Department>;
  flatDrivers: MatTableDataSource<FlatBusinessDrivers>;
  cheapDrivers: MatTableDataSource<CheapDrivers>;

  priceForm: FormGroup;
  price: number = 200.0;

  show = true;

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

  cardDriverDisplayedColumns = [
    'Id',
    'Department',
    'Last Name',
    'First Name',
    'Middle Name',
    'Date of Birth',
    'Shift'
  ];

  flatDriverDisplayedColumns = [
    'Id',
    'Department',
    'Car Id',
    'Type of Car',
    'Last Name',
    'First Name',
    'Date of Birth',
    'City',
    'Street',
    'Building',
    'Flat'
  ];

  cheapDriverDisplayedColumns = [
    'Number of Orders',
    'Id',
    'Last Name',
    'First Name',
  ];

  prodDepartmentDisplayedColumnds = [
    'Department Id',
    'City'
  ];

  constructor(
    private http: HttpClient,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.priceForm = this.formBuilder.group({
      price: ['', Validators.required]
    });


    this.getNumberOfOrders();
    this.getDrivers();
    this.getDepartmentsNumberOfOrders();
    this.getCreditCardDrivers();
    this.getProductiveDepartments();
    this.getFlatBusinessDrivers();
    this.getCheapDrivers();
  }

  setPrice() {
    this.price = parseInt(this.priceForm.value.price, 10);
    console.log(this.price);
    this.getCheapDrivers();
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

  getCreditCardDrivers() {
    this.http.get<CreditCardDrivers[]>(environment.baseUrl + 'api/drivers/credit')
      .subscribe(result => {
        this.creditDrivers = new MatTableDataSource<CreditCardDrivers>(result);
        console.log(this.creditDrivers);
      });
  }

  getNumberOfOrders() {
    this.http.get<NumberOfOrders>(environment.baseUrl + 'api/orders/count')
      .subscribe(res => {
        this.numberOfOrders = res.number;
      });
  }

  getProductiveDepartments() {
    this.http.get<Department[]>(environment.baseUrl + 'api/departments/productive')
    .subscribe(res => {
      this.prodDepartments = new MatTableDataSource<Department>(res);
      console.log(this.prodDepartments);
    });
  }

  getFlatBusinessDrivers() {
    this.http.get<FlatBusinessDrivers[]>(environment.baseUrl + 'api/drivers/flat')
    .subscribe(res => {
      this.flatDrivers = new MatTableDataSource<FlatBusinessDrivers>(res);
      console.log(this.flatDrivers);
    });
  }

  getCheapDrivers() {
    this.http.get<CheapDrivers[]>(environment.baseUrl + `api/drivers/cheap/${this.price}`)
    .subscribe(res => {
      this.cheapDrivers = new MatTableDataSource<CheapDrivers>(res);
      console.log(this.cheapDrivers);
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

  print(){
    const printContents = document.getElementById('componentID').innerHTML;
    const originalContents = document.body.innerHTML;

    this.show = false;
    document.body.innerHTML = printContents;

    window.print();

    document.body.innerHTML = originalContents;
    this.show = true;
  }
}
