import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Traveller } from '../../../models/Traveller.model';

@Component({
  templateUrl: 'register.component.html',
  styleUrls: ['register.component.css']
})

export class RegisterComponent implements OnInit {
  genders = [
    { value: 'male', viewValue: 'Male' },
    { value: 'female', viewValue: 'Female' },
  ];
  
  identity_types = [
    { value: 'kenyan_id', viewValue: 'Kenyan ID' },
    { value: 'alien_id', viewValue: 'Alien Id' },
    { value: 'passport', viewValue: 'Passport' },
    { value: 'birth_certificate', viewValue: 'Birth Certificate' },
  ];

  nationalities = [
    { value: 'kenya', viewValue: 'Kenya' },
    { value: 'other', viewValue: 'Other' },
  ];

  TravellerInstance = new Traveller(this.http);

  constructor(private http: HttpClient) { }

  ngOnInit(): void {

  }

  onSubmit(): void {
    this.TravellerInstance._processing = true;
    this.TravellerInstance.createInstance();
  }

}
