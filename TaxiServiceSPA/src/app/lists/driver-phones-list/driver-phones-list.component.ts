import { Component, OnInit, ViewChild } from '@angular/core';
import { DriverPhones } from 'src/interfaces/models/driver-phones';
import { HttpClient } from '@angular/common/http';
import { MatTableDataSource } from '@angular/material/table';
import { environment } from 'src/environments/environment';
import { MatPaginator } from '@angular/material/paginator';
import { StaffPhones } from 'src/interfaces/queryObjects/staffPhones';

@Component({
  selector: 'app-driver-phones-list',
  templateUrl: './driver-phones-list.component.html',
  styleUrls: ['./driver-phones-list.component.css']
})
export class DriverPhonesListComponent implements OnInit {

  constructor(public http: HttpClient) {}

  phones: MatTableDataSource<StaffPhones>;
  item = 'Телефон Водія';

  displayedColumns = ['Phone Number', 'Driver Id', 'Last Name', 'First Name', 'Birthday', 'Actions'];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  ngOnInit() {
    this.getPhones();
  }

  getPhones() {
    this.http
      .get<StaffPhones[]>(environment.baseUrl + 'api/driverphones')
      .subscribe((result) => {
        this.phones = new MatTableDataSource<StaffPhones>(result);
        this.phones.paginator =  this.paginator;
        console.log(this.phones);
      });
  }

  getDate(dt: StaffPhones) {
    return dt.dateOfBirth.substr(0, 10);
  }


  onRowClicked(row: any) {
    console.log('Row clicked: ', row);
  }

}
