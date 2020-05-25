import { Component, AfterViewChecked } from '@angular/core';

enum UserRoles {
  Client = 1,
  Operator,
  Driver
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{
  title = 'Taxi Service';

  userRole: UserRoles;

  setUserRole(role: number) {
    this.userRole = role;
    console.log(UserRoles[this.userRole]);
  }
}
