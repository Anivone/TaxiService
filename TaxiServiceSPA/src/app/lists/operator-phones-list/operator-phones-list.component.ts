import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatTableDataSource } from '@angular/material/table';
import { OperatorPhones } from 'src/interfaces/models/operator-phones';
import { environment } from 'src/environments/environment';
import { MatPaginator } from '@angular/material/paginator';
import { StaffPhones } from 'src/interfaces/queryObjects/staffPhones';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-operator-phones-list',
  templateUrl: './operator-phones-list.component.html',
  styleUrls: ['./operator-phones-list.component.css']
})
export class OperatorPhonesListComponent implements OnInit {

  constructor(public http: HttpClient) {}

  phones: MatTableDataSource<StaffPhones>;
  item = 'Телефон Оператора';

  displayedColumns = ['phoneNumber', 'operatorId', 'lastName', 'firstName', 'birthday', 'Actions'];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  ngOnInit() {
    this.getPhones();
  }

  getDate(dt: StaffPhones) {
    return dt.dateOfBirth.substr(0, 10);
  }

  getPhones() {
    this.http
      .get<StaffPhones[]>(environment.baseUrl + 'api/operatorphones')
      .subscribe((result) => {
        this.phones = new MatTableDataSource<StaffPhones>(result);
        this.phones.paginator = this.paginator;
        this.phones.sort = this.sort;
        console.log(this.phones);
      });
  }

  onRowClicked(row: any) {
    console.log('Row clicked: ', row);
  }

}
