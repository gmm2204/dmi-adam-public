import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormControl, Validators } from '@angular/forms';

import { MErrorStateMatcher } from '../../../models/MErrorStateMatcher.model';
import { Traveller } from '../../../models/Traveller.model';
import { KVFormControl } from '../../../models/KVFormControl.model';
import { MKeyValue } from "../../../models/MKeyValue.model";

@Component({
  templateUrl: 'registration.component.html',
  styleUrls: ['registration.component.scss'],
})

export class RegistrationComponent implements OnInit {
  matcher = new MErrorStateMatcher();
  TravellerInstance = new Traveller(this.http);
  FCTraveller: KVFormControl = {};

  genders = [
    { value: 'male', viewValue: 'Male' },
    { value: 'female', viewValue: 'Female' },
  ];

  identity_types = [
    { value: 'kenyan_id', viewValue: 'Kenyan ID' },
    { value: 'alien_id', viewValue: 'Alien ID' },
    { value: 'passport', viewValue: 'Passport' },
    { value: 'birth_certificate', viewValue: 'Birth Certificate' },
  ];

  nationalities = [
    { value: 'kenya', viewValue: 'Kenya' },
    { value: 'other', viewValue: 'Other' },
  ];

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.seedFormControls();
  }

  onSubmit(): void {
    let is_valid = true;

    Object.keys(this.FCTraveller).forEach(fc_key => {
      if (this.FCTraveller[fc_key].hasError("required")) {
        is_valid = false;
        return;
      }
    });

    if (is_valid) {
      this.TravellerInstance._processing = true;
      this.TravellerInstance.createInstance();
    } else {
      console.log("Invalid!");
    }
  }

  seedFormControls() {
    this.FCTraveller["traveller_nationality"] = new FormControl('', [Validators.required]);
    this.FCTraveller["_identity_type"] = new FormControl('', [Validators.required]);
    this.FCTraveller["_identity_number"] = new FormControl('', [Validators.required]);

    this.FCTraveller["traveller_first_name"] = new FormControl('', [Validators.required]);
    this.FCTraveller["traveller_middle_name"] = new FormControl('', []);
    this.FCTraveller["traveller_last_name"] = new FormControl('', [Validators.required]);

    this.FCTraveller["traveller_gender"] = new FormControl('', [Validators.required]);
    this.FCTraveller["traveller_dob"] = new FormControl('', [Validators.required]);

    this.FCTraveller["traveller_occupation"] = new FormControl('', [Validators.required]);

    this.FCTraveller["traveller_date_arrival"] = new FormControl('', [Validators.required]);
    this.FCTraveller["traveller_poe"] = new FormControl('', [Validators.required]);

    this.FCTraveller["traveller_departure_country"] = new FormControl('', [Validators.required]);
    this.FCTraveller["traveller_departure_town"] = new FormControl('', [Validators.required]);

    this.FCTraveller["traveller_conveyance_mode"] = new FormControl('', [Validators.required]);
    this.FCTraveller["converyance_number"] = new FormControl('', []);
    this.FCTraveller["conveyance_seat_number"] = new FormControl('', []);

    this.FCTraveller["traveller_travel_purpose"] = new FormControl('', []);

    this.FCTraveller["traveller_phone_number_kenyan"] = new FormControl('', []);
    this.FCTraveller["traveller_email_address"] = new FormControl('', []);
    this.FCTraveller["traveller_postal_address"] = new FormControl('', []);

    this.FCTraveller["traveller_travel_uganda"] = new FormControl('', []);
    this.FCTraveller["traveller_travel_mubende"] = new FormControl('', []);

    this.FCTraveller["traveller_travel_mubende_locations"] = new FormControl('', []);
    this.FCTraveller["traveller_travel_mubende_duration"] = new FormControl('', []);

    this.FCTraveller["traveller_patient_care"] = new FormControl('', []);

    this.FCTraveller["traveller_fever"] = new FormControl('', []);
    this.FCTraveller["traveller_diarrhea"] = new FormControl('', []);

    this.FCTraveller["traveller_headache"] = new FormControl('', []);
    this.FCTraveller["traveller_joint_muscle_pains"] = new FormControl('', []);

    this.FCTraveller["traveller_bone_pain"] = new FormControl('', []);
    this.FCTraveller["traveller_unexplained_bruising"] = new FormControl('', []);

    this.FCTraveller["traveller_unusual_body_weakness"] = new FormControl('', []);
    this.FCTraveller["traveller_internal_external_bleeding"] = new FormControl('', []);

    this.FCTraveller["traveller_sore_painful_throat"] = new FormControl('', []);
    this.FCTraveller["traveller_cough_vomiting"] = new FormControl('', []);

    this.FCTraveller["traveller_common_cold"] = new FormControl('', []);
    this.FCTraveller["traveller_weight_loss"] = new FormControl('', []);

    this.FCTraveller["traveller_kenyan_residence"] = new FormControl('', []);
    this.FCTraveller["traveller_contact_name"] = new FormControl('', []);
    this.FCTraveller["traveller_contact_phone_number"] = new FormControl('', []);

    this.FCTraveller["traveller_village_house_hotel"] = new FormControl('', []);
    this.FCTraveller["traveller_sub_location_estate"] = new FormControl('', []);
    this.FCTraveller["traveller_county"] = new FormControl('', []);
  }

}
