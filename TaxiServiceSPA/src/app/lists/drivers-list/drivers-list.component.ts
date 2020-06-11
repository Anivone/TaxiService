import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Driver } from 'src/interfaces/models/driver';
import { MatTableDataSource } from '@angular/material/table';
import { environment } from 'src/environments/environment';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-drivers-list',
  templateUrl: './drivers-list.component.html',
  styleUrls: ['./drivers-list.component.css'],
})
export class DriversListComponent implements OnInit {
  constructor(public http: HttpClient) {}

  drivers: MatTableDataSource<Driver>;
  item = 'Водія';
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  displayedColumns = [
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
    'Available',
    'Actions'
  ];

  ngOnInit() {
    this.getDrivers();
  }

  getDrivers() {
    this.http
      .get<Driver[]>(environment.baseUrl + 'api/drivers')
      .subscribe((result) => {
        this.drivers = new MatTableDataSource<Driver>(result);
        this.drivers.paginator = this.paginator;
        console.log(result);
      });
  }

  getTime(dt: string) {
    return dt.substr(11);
  }

  getDate(dt: string) {
    return dt.substr(0, 10);
  }

  onRowClicked(row: any) {
    console.log('Row clicked: ', row);
  }
}
