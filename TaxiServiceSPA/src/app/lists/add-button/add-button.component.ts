import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { AddPageComponent } from 'src/app/add-page/add-page.component';

@Component({
  selector: 'app-add-button',
  templateUrl: './add-button.component.html',
  styleUrls: ['./add-button.component.css']
})
export class AddButtonComponent implements OnInit {
  public dialogRef: MatDialogRef<AddPageComponent>;
  @Input() public item: string;

  @Output() public emitter = new EventEmitter();

  constructor(private dialog: MatDialog) { }

  ngOnInit() {
  }

  openAddPage() {
    this.dialogRef = this.dialog.open(AddPageComponent, {
      autoFocus: true,
      data: {
        item: this.item,
        edit: false
      }
    });

    this.dialogRef.afterClosed().subscribe(() => {
      this.emitter.emit('closed');
    });
  }
}
