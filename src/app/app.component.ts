import { Component, AfterViewChecked, OnInit, Input } from '@angular/core';
import { AuthService } from './services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { OperatorAddingFormComponent } from './operator-adding-form/operator-adding-form.component';
import { AddOrderFormComponent } from './add-order-form/add-order-form.component';
import { AddCarFormComponent } from './add-car-form/add-car-form.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'Taxi Service';

  constructor(private auth: AuthService,
    public dialog: MatDialog) { }

  ngOnInit(): void {
    this.validateToken();
  }

  validateToken() {
    if (!localStorage.getItem('authToken')) { return; }

    const token = JSON.parse(
      window.atob(localStorage.getItem('authToken').split('.')[1])
    );
    if (Date.now() > token.exp * 1000) {
      localStorage.removeItem('authToken');
    }

    const timeLeft = token.exp * 1000 - Date.now();
    console.log('time left: ', timeLeft);
  }

  Add(): void {

    const dialogRef = this.dialog.open(AddCarFormComponent, {
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed: ');
      // this.first_name = result;
    });

  }  
}
