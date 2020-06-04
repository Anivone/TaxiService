import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatTableDataSource } from '@angular/material/table';
import { Department } from 'src/interfaces/models/department';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-departments-list',
  templateUrl: './departments-list.component.html',
  styleUrls: ['./departments-list.component.css'],
})
export class DepartmentsListComponent implements OnInit {
  constructor(public http: HttpClient) {}

  departments: MatTableDataSource<Department>;
  item = 'Department';

  displayedColumns = ['Department Id', 'City', 'Actions'];

  ngOnInit() {
    this.getDepartments();
  }

  getDepartments() {
    this.http
      .get<Department[]>(environment.baseUrl + 'api/departments')
      .subscribe((result) => {
        this.departments = new MatTableDataSource<Department>(result);
        console.log(this.departments);
      });
  }

  onRowClicked(row: any) {
    console.log('Row clicked: ', row);
  }

}
