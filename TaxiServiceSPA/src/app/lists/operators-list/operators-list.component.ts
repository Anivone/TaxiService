import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatTableDataSource } from '@angular/material/table';
import { Operator } from 'src/interfaces/models/operator';
import { environment } from 'src/environments/environment';
import { stringToKeyValue } from '@angular/flex-layout/extended/typings/style/style-transforms';

@Component({
  selector: 'app-operators-list',
  templateUrl: './operators-list.component.html',
  styleUrls: ['./operators-list.component.css'],
})
export class OperatorsListComponent implements OnInit {
  constructor(public http: HttpClient) {}

  displayedColumns = [
    'Id',
    'Department Id',
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
    'Working Phone',
    'Actions',
  ];

  operators: MatTableDataSource<Operator>;

  ngOnInit() {
    this.getOperators();
  }

  getOperators() {
    this.http
      .get<Operator[]>(environment.baseUrl + 'api/operators')
      .subscribe((result) => {
        this.operators = new MatTableDataSource<Operator>(result);
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
