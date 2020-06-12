import { Component, OnInit } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
import { OperatorPhones } from 'src/interfaces/models/operator-phones';
@Component({
  selector: 'app-operator-phones-component',
  templateUrl: './operator-phones-component.component.html',
  styleUrls: ['./operator-phones-component.component.css']
})
export class OperatorPhonesComponentComponent implements OnInit {
  operatorPhonesForm: FormGroup;

  // firstName: string
  // middleNmae: string
  valid = true;
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  num: number;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  phones: any[] = [];
  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient

  ) { }

  ngOnInit() {
    this.operatorPhonesForm = this.formBuilder.group({
      tNumber: ['', Validators.required],
      personalPhone: ['', Validators.required]


    });


  }
  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    if ((value || '').trim()) {
      this.phones.push(value);

    }

    if (input) {
      input.value = '';
    }
  }

  remove(phone: any): void {


    const index = this.phones.indexOf(phone);

    if (index >= 0) {
      this.phones.splice(index, 1);
    }
  }

  isValid() {
    var reg = /^\d+$/;

    for (let index in this.phones) {
      if (reg.test(this.phones[index]) || this.phones.length == 0) {
        this.valid = true;
      } else {
        this.valid = false;
      }
    }
    if (this.phones.length == 0) {
      this.valid = true;
    }
  }
  onSubmit() {
    console.log(this.phones.length);
    // console.log(this.phones[0] === "string" );
    // console.log(this.phones);
    this.http.post<OperatorPhones>(environment.baseUrl + 'api/operatorsPhones/new', {
      operatorId: this.operatorPhonesForm.value.tNumber,
      phoneNumber: this.phones


    }).subscribe(result => {
      console.log(result);

    }, err => console.log(err));

  }

}
