import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { environment } from 'src/environments/environment';
import { GetUser } from 'src/interfaces/queryObjects/getUser';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {
  constructor(public http: HttpClient) {}

  users: MatTableDataSource<GetUser>;
  item = 'Користувача';

  displayedColumns = ['id', 'username', 'role', 'Actions'];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;


  ngOnInit() {
    this.getUsers();
  }

  getUsers() {
    this.http
      .get<GetUser[]>(environment.baseUrl + 'api/user')
      .subscribe((result) => {
        this.users = new MatTableDataSource<GetUser>(result);
        this.users.paginator = this.paginator;
        this.users.sort = this.sort;
        console.log(this.users);
      });
  }

  delete(user: GetUser) {
    this.http.delete(environment.baseUrl + `api/user/${user.id}`)
    .subscribe(() => {
      console.log('User deleted !');
      this.getUsers();
    });
  }
}
