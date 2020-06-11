import { Component, OnInit, ViewChild } from '@angular/core';
import { DriverPhones } from 'src/interfaces/models/driver-phones';
import { HttpClient } from '@angular/common/http';
import { MatTableDataSource } from '@angular/material/table';
import { environment } from 'src/environments/environment';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-driver-phones-list',
  templateUrl: './driver-phones-list.component.html',
  styleUrls: ['./driver-phones-list.component.css']
})
export class DriverPhonesListComponent implements OnInit {

  constructor(public http: HttpClient) {}

  phones: MatTableDataSource<DriverPhones>;
  item = 'Телефон Водія';

  displayedColumns = ['Phone Number', 'Driver Id', 'Actions'];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  ngOnInit() {
    this.getPhones();
  }

  getPhones() {
    this.http
      .get<DriverPhones[]>(environment.baseUrl + 'api/driverphones')
      .subscribe((result) => {
        this.phones = new MatTableDataSource<DriverPhones>(result);
        this.phones.paginator =  this.paginator;
        console.log(this.phones);
      });
  }

  onRowClicked(row: any) {
    console.log('Row clicked: ', row);
  }

}
