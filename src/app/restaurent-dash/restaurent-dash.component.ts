import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-restaurent-dash',
  templateUrl: './restaurent-dash.component.html',
  styleUrls: ['./restaurent-dash.component.css'],
})
export class RestaurentDashComponent implements OnInit {
  formValue!: FormGroup;
  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.formValue = this.fb.group({
      name: [''],
      email: [''],
      mobile: [''],
      address: [],
      services: [''],
    });
  }
}
