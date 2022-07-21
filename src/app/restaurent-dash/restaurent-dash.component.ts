import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ApiService } from '../shared/api.service';
import { RestaurantData } from '../shared/restaurent.model';

@Component({
  selector: 'app-restaurent-dash',
  templateUrl: './restaurent-dash.component.html',
  styleUrls: ['./restaurent-dash.component.css'],
})
export class RestaurentDashComponent implements OnInit {
  formValue!: FormGroup;
  restaurentModelObject: RestaurantData = new RestaurantData();
  allRestaurentData: any;
  showAddBtn!: boolean;
  showUpdateBtn!: boolean;

  constructor(private fb: FormBuilder, private api: ApiService) {}

  ngOnInit(): void {
    this.formValue = this.fb.group({
      name: [''],
      email: [''],
      mobile: [''],
      address: [],
      services: [''],
    });
    this.getAllData();
  }

  clickAddRestro(){
    this.formValue.reset();
    this.showAddBtn = true;
    this.showUpdateBtn = false;

  }
  //Now Subscribing Our Data Which is mapped via services ...0

  addRestro() {
    this.restaurentModelObject.name = this.formValue.value.name;
    this.restaurentModelObject.email = this.formValue.value.email;
    this.restaurentModelObject.mobile = this.formValue.value.mobile;
    this.restaurentModelObject.address = this.formValue.value.address;
    this.restaurentModelObject.services = this.formValue.value.services;

    this.api.postRestaurent(this.restaurentModelObject).subscribe(
      (res) => {
        console.log(res);
        alert('Restaurent Record Added SuccessFully');
        //clear fillform data
        let ref = document.getElementById('clear');
        ref?.click();
        this.formValue.reset();
        this.getAllData();
      },
      (err) => {
        alert('Something went Wrong');
      }
    );
  }

  // Get All Data
  getAllData() {
    this.api.getRestaurent().subscribe((res) => {
      this.allRestaurentData = res;
    });
  }

  //Delete Records
  deleteRestro(data: any) {
    this.api.deleteRestaurent(data.id).subscribe((res) => {
      alert('Restaurent Record Deleted');
      this.getAllData();
    });
  }

  onEditRestro(data: any) {
    this.showAddBtn = false;
    this.showUpdateBtn = true;
    this.restaurentModelObject.id = data.id;
    this.formValue.controls['name'].setValue(data.name);
    this.formValue.controls['email'].setValue(data.email);
    this.formValue.controls['mobile'].setValue(data.mobile);
    this.formValue.controls['address'].setValue(data.address);
    this.formValue.controls['services'].setValue(data.services);
  }

  updateRestro() {
    this.restaurentModelObject.name = this.formValue.value.name;
    this.restaurentModelObject.email = this.formValue.value.email;
    this.restaurentModelObject.mobile = this.formValue.value.mobile;
    this.restaurentModelObject.address = this.formValue.value.address;
    this.restaurentModelObject.services = this.formValue.value.services;

    this.api
      .updateRestaurent(
        this.restaurentModelObject,
        this.restaurentModelObject.id
      )
      .subscribe((res) => {
        alert('Restaurent Record Update Successfully');
        let ref = document.getElementById('clear');
        ref?.click();
        this.formValue.reset();
        this.getAllData();
      });
  }
}
