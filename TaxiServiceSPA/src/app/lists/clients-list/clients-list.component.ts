import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatTableDataSource } from '@angular/material/table';
import { Client } from 'src/interfaces/models/client';
import { environment } from 'src/environments/environment';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-clients-list',
  templateUrl: './clients-list.component.html',
  styleUrls: ['./clients-list.component.css']
})
export class ClientsListComponent implements OnInit {
  constructor(public http: HttpClient) {}

  displayedColumns = [
    'Id',
    'Phone Number',
    'First Name',
    'Last Name',
    'Middle Name',
    'Date of Registration',
    'Email',
    'Credit Card Number',
    'Actions'
  ];
  clients: MatTableDataSource<Client>;
  item = 'Клієнта';
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  ngOnInit() {
    this.getClients();
  }

  getClients() {
    this.http
      .get<Client[]>(environment.baseUrl + 'api/clients')
      .subscribe((result) => {
        this.clients = new MatTableDataSource<Client>(result);
        this.clients.paginator = this.paginator;
        console.log(this.clients);
      });
  }

  onRowClicked(row: any) {
    console.log('Row clicked: ', row);
  }

  getTime(dt: string) {
    return dt.substr(11);
  }

  getDate(dt: string) {
    return dt.substr(0, 10);
  }
}