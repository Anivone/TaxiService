import { Component, OnInit, Input } from '@angular/core';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { AddPageComponent } from 'src/app/add-page/add-page.component';
import { OperatorAddingFormComponent } from 'src/app/operator-adding-form/operator-adding-form.component';
import { AddOrderFormComponent } from 'src/app/add-order-form/add-order-form.component';
import { AddCarFormComponent } from 'src/app/add-car-form/add-car-form.component';
import { DriverAddingFormComponent } from 'src/app/driver-adding-form/driver-adding-form.component';
import { UserAddingFormComponent } from 'src/app/user-adding-form/user-adding-form.component';

@Component({
  selector: 'app-add-button',
  templateUrl: './add-button.component.html',
  styleUrls: ['./add-button.component.css']
})
export class AddButtonComponent implements OnInit {
  // public dialogRef: MatDialogRef<AddCarFormComponent>;
  @Input() public item: string;

  constructor(private dialog: MatDialog) { }

  ngOnInit() {
  }

  openAddPage() {
    const dialogRef = this.dialog.open(UserAddingFormComponent, {
});
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed: ');
  });
}

}