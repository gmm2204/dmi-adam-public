import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormControl, Validators } from '@angular/forms';

import { MErrorStateMatcher } from '../../../models/MErrorStateMatcher.model';
import { Traveller } from '../../../models/Traveller.model';
import { KVFormControl } from '../../../models/KVFormControl.model';


@Component({
  templateUrl: 'check_up.component.html',
  styleUrls: ['check_up.component.scss'],
})

export class CheckUpComponent implements OnInit {
  matcher = new MErrorStateMatcher();
  TravellerInstance = new Traveller(this.http);
  CheckupInstance = new Traveller(this.http);
  FCTraveller: KVFormControl = {};
  FCCheckup: KVFormControl = {};
  retrievedData: any;
  showCard: boolean = true;

  case_classifications = [
    { value: 'fit_for_travel', viewValue: 'Fit for Travel' },
    { value: 'suspect', viewValue: 'Suspect' },
    { value: 'probable', viewValue: 'Probable' },
    { value: 'confirmed', viewValue: 'Confirmed' },
  ];

  taken_actions = [
    { value: 'referred', viewValue: 'Referred' },
    { value: 'deported', viewValue: 'Deported' },
    { value: 'quarantined', viewValue: 'quarantined' },
    { value: 'other', viewValue: 'Other' },
  ];


  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.seedFormControls();
    this.seedCheckupFormControls();
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
      this.TravellerInstance.getTravellerInstance()
        .then((response) => {
          this.retrievedData = response[0];
          this.TravellerInstance._api_response = response[0];

          this.TravellerInstance._identity_number = this.retrievedData['_id'] ?? '';
          this.seedCheckupFormControls();
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  }

  onSubmitCheckup(): void {
    let is_valid = true;

    Object.keys(this.FCCheckup).forEach(fc_key => {
      if (this.FCCheckup[fc_key].hasError("required")) {
        is_valid = false;
        return;
      }
    });

    if (is_valid) {
      this.TravellerInstance._processing = true;
      this.TravellerInstance.createCheckup()
        .then((response) => {
          this.retrievedData = response[0];

          this.TravellerInstance._identity_number = this.retrievedData['_id'] ?? '';
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  }


  seedFormControls() {
    this.FCTraveller["_id"] = new FormControl('', [Validators.required]);
  }

  seedCheckupFormControls(): void{
    this.FCCheckup["traveller_body_temperature"] = new FormControl('', [Validators.required]);
    this.FCCheckup["traveller_case_classification"] = new FormControl('', [Validators.required]);
    this.FCCheckup["traveller_action_taken"] = new FormControl('', [Validators.required]);
    this.FCCheckup["traveller_checkup_date"] = new FormControl('', [Validators.required]);
    this.FCCheckup["_identity_number"] = new FormControl(this.retrievedData?._traveller_Id ?? '');

  }

  protected readonly Object = Object;

  toggleCard() {
    this.showCard = !this.showCard;
  }
}
