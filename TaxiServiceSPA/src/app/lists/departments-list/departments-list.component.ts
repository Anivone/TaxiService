import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatTableDataSource } from '@angular/material/table';
import { Department } from 'src/interfaces/models/department';
import { environment } from 'src/environments/environment';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-departments-list',
  templateUrl: './departments-list.component.html',
  styleUrls: ['./departments-list.component.css'],
})
export class DepartmentsListComponent implements OnInit {
  constructor(public http: HttpClient) {}

  departments: MatTableDataSource<Department>;
  item = 'Відділення';

  displayedColumns = ['Department Id', 'City', 'Actions'];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  ngOnInit() {
    this.getDepartments();
  }

  getDepartments() {
    this.http
      .get<Department[]>(environment.baseUrl + 'api/departments')
      .subscribe((result) => {
        this.departments = new MatTableDataSource<Department>(result);
        this.departments.paginator = this.paginator;
        console.log(this.departments);
      });
  }

  onRowClicked(row: any) {
    console.log('Row clicked: ', row);
  }

}
