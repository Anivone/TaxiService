import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatTableDataSource } from '@angular/material/table';
import { Client } from 'src/interfaces/models/client';
import { environment } from 'src/environments/environment';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { AddPageComponent } from 'src/app/add-page/add-page.component';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-clients-list',
  templateUrl: './clients-list.component.html',
  styleUrls: ['./clients-list.component.css']
})
export class ClientsListComponent implements OnInit {
  constructor(
    public http: HttpClient,
    private dialog: MatDialog
  ) { }

  displayedColumns = [
    'clientId',
    'phoneNumber',
    'firstName',
    'lastName',
    'middleName',
    'dateOfRegistration',
    'email',
    'creditCardNumber',
    'Actions'
  ];
  clients: MatTableDataSource<Client>;
  item = 'Клієнта';
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  ngOnInit() {
    this.getClients();
  }

  getClients() {
    this.http
      .get<Client[]>(environment.baseUrl + 'api/clients')
      .subscribe((result) => {
        this.clients = new MatTableDataSource<Client>(result);
        this.clients.paginator = this.paginator;
        this.clients.sort = this.sort;
        console.log(this.clients);
      });
  }

  getTime(dt: string) {
    return dt.substr(11);
  }

  getDate(dt: string) {
    return dt.substr(0, 10);
  }

  edit(client: Client) {
    const dialogRef = this.dialog.open(AddPageComponent, {
      autoFocus: true,
      data: {
        item: this.item,
        client,
        edit: true
      }
    });

    dialogRef.afterClosed().subscribe(() => this.getClients());
  }

  delete(client: Client) {
    this.http.delete(environment.baseUrl + `api/clients/${client.clientId}`)
      .subscribe(() => {
        this.getClients();
        console.log('client deleted');
      });
  }
}
