import { ApiService } from './../shared/api.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { RestaurantData } from './restaurant.model';

@Component({
  selector: 'app-restaurant-dash',
  templateUrl: './restaurant-dash.component.html',
  styleUrls: ['./restaurant-dash.component.css']
})
export class RestaurantDashComponent implements OnInit {

  formValue!: FormGroup;
  allRestaurantData: any;
  showAdd!: boolean;
  showUpdate!: boolean;
  restaurantModelObj: RestaurantData = new RestaurantData();

  constructor(private formBuilder: FormBuilder, private api: ApiService) { }

  ngOnInit(): void {
    this.formValue = this.formBuilder.group(
      {
        name:[''],
        email:[''],
        mobile:[''],
        address:[''],
        service:[''],
      }
    );
    this.getAllRestaurantData();
  }

  clickAddRestaurantBtn () {
    this.formValue.reset();
    this.showAdd = true;
    this.showUpdate = false;
  }

  addRestaurantData () {
    this.restaurantModelObj.name = this.formValue.value.name;
    this.restaurantModelObj.email = this.formValue.value.email;
    this.restaurantModelObj.mobile = this.formValue.value.mobile;
    this.restaurantModelObj.address = this.formValue.value.address;
    this.restaurantModelObj.service = this.formValue.value.service;

    this.api.postRestaurant(this.restaurantModelObj).subscribe(
      res=> {
      alert("Restaurant Record Added Successfully.");
      let ref = document.getElementById('clear');
      ref?.click();
      this.formValue.reset();
      this.getAllRestaurantData();
    },
      err=> {
        alert("Restaurant Record Didnt Added Successfully.");
      }
    );
  }

  getAllRestaurantData () {
    this.api.getRestaurant().subscribe(
      res=> {
        this.allRestaurantData = res;
    }
    );
  }

  deleteRestaurantData(data: any) {
    this.api.deleteRestaurant(data.id).subscribe(
      res=> {
      alert("Restaurant Records Deleted Successfully.");
      this.getAllRestaurantData();
    });
  }

  editRestaurantData (data: any) {
    this.showAdd = false;
    this.showUpdate = true;
    this.restaurantModelObj.id = data.id;
    this.formValue.controls['name'].setValue(data.name);
    this.formValue.controls['email'].setValue(data.email);
    this.formValue.controls['mobile'].setValue(data.mobile);
    this.formValue.controls['address'].setValue(data.address);
    this.formValue.controls['service'].setValue(data.service);
  }

  updateRestaurantData () {
    this.restaurantModelObj.name = this.formValue.value.name;
    this.restaurantModelObj.email = this.formValue.value.email;
    this.restaurantModelObj.mobile = this.formValue.value.mobile;
    this.restaurantModelObj.address = this.formValue.value.address;
    this.restaurantModelObj.service = this.formValue.value.service;

    this.api.updateRestaurant(this.restaurantModelObj, this.restaurantModelObj.id).subscribe(
      res => {
        alert("Restaurant Records Updated.");
        let ref = document.getElementById('clear');
      ref?.click();
      this.formValue.reset();
      this.getAllRestaurantData();
      }
    );
  }
}
