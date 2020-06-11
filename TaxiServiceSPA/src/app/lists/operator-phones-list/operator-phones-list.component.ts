import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatTableDataSource } from '@angular/material/table';
import { OperatorPhones } from 'src/interfaces/models/operator-phones';
import { environment } from 'src/environments/environment';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-operator-phones-list',
  templateUrl: './operator-phones-list.component.html',
  styleUrls: ['./operator-phones-list.component.css']
})
export class OperatorPhonesListComponent implements OnInit {

  constructor(public http: HttpClient) {}

  phones: MatTableDataSource<OperatorPhones>;
  item = 'Телефон Оператора';

  displayedColumns = ['Phone Number', 'Operator Id', 'Actions'];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  ngOnInit() {
    this.getPhones();
  }

  getPhones() {
    this.http
      .get<OperatorPhones[]>(environment.baseUrl + 'api/operatorphones')
      .subscribe((result) => {
        this.phones = new MatTableDataSource<OperatorPhones>(result);
        this.phones.paginator = this.paginator;
        console.log(this.phones);
      });
  }

  onRowClicked(row: any) {
    console.log('Row clicked: ', row);
  }

}
