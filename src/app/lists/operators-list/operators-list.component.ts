import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatTableDataSource } from '@angular/material/table';
import { Operator } from 'src/interfaces/models/operator';
import { environment } from 'src/environments/environment';
import { stringToKeyValue } from '@angular/flex-layout/extended/typings/style/style-transforms';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { AddPageComponent } from 'src/app/add-page/add-page.component';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-operators-list',
  templateUrl: './operators-list.component.html',
  styleUrls: ['./operators-list.component.css'],
})
export class OperatorsListComponent implements OnInit {
  constructor(
    public http: HttpClient,
    public dialog: MatDialog
  ) { }

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
  item = 'Оператора';

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  ngOnInit() {
    this.getOperators();
    this.operators.sort = this.sort;

  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.operators.filter = filterValue.trim().toLowerCase();

    if (this.operators.paginator) {
      this.operators.paginator.firstPage();
    }
  }

  getOperators() {
    this.http
      .get<Operator[]>(environment.baseUrl + 'api/operators')
      .subscribe((result) => {
        this.operators = new MatTableDataSource<Operator>(result);
        this.operators.paginator = this.paginator;
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

  edit(operator: Operator) {
    const dialogRef = this.dialog.open(AddPageComponent, {
      autoFocus: true,
      data: {
        item: this.item,
        operator,
        edit: true
      }
    });

    dialogRef.afterClosed().subscribe(() => this.getOperators());
  }

  delete(operator: Operator) {
    this.http.delete(environment.baseUrl + `api/operators/${operator.operatorId}`)
      .subscribe(() => {
        this.getOperators();
        console.log('operator deleted');
      });
  }
}