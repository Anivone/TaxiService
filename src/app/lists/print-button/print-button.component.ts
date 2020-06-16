import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-print-button',
  templateUrl: './print-button.component.html',
  styleUrls: ['./print-button.component.css']
})
export class PrintButtonComponent  {

  printPage() {
    window.print();
  }

}
