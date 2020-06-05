import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-operator-page',
  templateUrl: './operator-page.component.html',
  styleUrls: ['./operator-page.component.css']
})
export class OperatorPageComponent implements AfterViewInit {

  @ViewChild('container') container: ElementRef;

  constructor() { }

  ngAfterViewInit(): void {
    const height = this.container.nativeElement.offsetHeight;
    if (height > 500) {
      console.log('more: ', height);
    } else {
      console.log('less: ', height);
    }
  }

}
