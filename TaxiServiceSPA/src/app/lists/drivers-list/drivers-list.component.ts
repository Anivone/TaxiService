import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Driver } from 'src/interfaces/models/driver';
import { MatTableDataSource } from '@angular/material/table';
import { environment } from 'src/environments/environment';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AddPageComponent } from 'src/app/add-page/add-page.component';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-drivers-list',
  templateUrl: './drivers-list.component.html',
  styleUrls: ['./drivers-list.component.css'],
})
export class DriversListComponent implements OnInit {
  constructor(
    public http: HttpClient,
    private dialog: MatDialog,
  ) { }

  drivers: MatTableDataSource<Driver>;
  item = 'Водія';
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  displayedColumns = [
    'driverId',
    'departmentId',
    'carId',
    'lastName',
    'firstName',
    'middleName',
    'dateOfBirth',
    'region',
    'city',
    'street',
    'building',
    'flat',
    'beginning',
    'ending',
    'salary',
    'available',
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
        this.drivers.sort = this.sort;
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

  edit(driver: Driver) {
    const dialogRef = this.dialog.open(AddPageComponent, {
      autoFocus: true,
      data: {
        item: this.item,
        driver,
        edit: true
      }
    });

    dialogRef.afterClosed().subscribe(() => this.getDrivers());
  }

  delete(driver: Driver) {
    this.http.delete(environment.baseUrl + `api/drivers/${driver.driverId}`)
      .subscribe(() => {
        this.getDrivers();
        console.log('driver deleted');
      });
  }
}
