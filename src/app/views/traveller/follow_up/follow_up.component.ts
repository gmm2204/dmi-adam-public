import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormControl, Validators } from '@angular/forms';

import { MErrorStateMatcher } from '../../../models/MErrorStateMatcher.model';
import {Traveller} from '../../../models/Traveller.model';
import { KVFormControl } from '../../../models/KVFormControl.model';
import {Followup} from "../../../models/followup.model";

@Component({
  templateUrl: 'follow_up.component.html',
  styleUrls: ['follow_up.component.scss'],
})

export class FollowUpComponent implements OnInit {
  matcher = new MErrorStateMatcher();
  TravellerInstance = new Traveller(this.http);
  FCTraveller: KVFormControl = {};
  FCFollowup: KVFormControl = {};
  retrievedData: any;
  showCard: boolean = true;
  showFollowups: boolean = true;
  protected readonly Object = Object;
  minimizedStates: boolean[] = [];
  FollowupInstance = new Followup(this.http);
  followupUpData: any;

  constructor(private http: HttpClient) { }

  items = [
    { firstName: 'Elvis', lastName: 'Otieno' },
    { firstName: 'John', lastName: 'Die' },
    { firstName: 'dfghjk', lastName: 'fghjn' },
    // ... more items
  ];

  ngOnInit(): void {
    this.seedFormControls();
    this.seedFollowupFormControls();
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
      this.TravellerInstance._processing = true;
      this.resetFormControls(this.FCFollowup);
      this.TravellerInstance.getTravellerInstance()
        .then((response) => {
          this.retrievedData = response[0];
          this.TravellerInstance._api_response = response[0];
          this.TravellerInstance._identity_number = this.retrievedData??['_id'] ?? '';
        })
        .catch((error) => {
          console.error("Error:", error);
        });

      this.FollowupInstance._traveller_id = this.TravellerInstance._id;
      this.FollowupInstance.getTravellerFollowup()
        .then((checkUpResponse) => {
          this.followupUpData = checkUpResponse;
          console.log('this.TravellerInstance', this.TravellerInstance._api_response)

        })
        .catch((error) => {
          console.error("Get CheckupInstance Error:", error);
        });
    }
  }

  onSubmitFollowup(): void {
    let is_valid = true;

    Object.keys(this.FCFollowup).forEach(fc_key => {
      if (this.FCFollowup[fc_key].hasError("required")) {
        is_valid = false;
        return;
      }
    });

    if (is_valid) {
      this.FollowupInstance._processing = true;
      this.FollowupInstance.createFollowup()
        .then((response) => {
          this.followupUpData = response;
          this.FollowupInstance._processing = false;
          if(this.followupUpData[1] == 1){
            this.showCard = false;
            this.showFollowups = false;
            this.resetFormControls(this.FCFollowup);
          }
          console.log('FollowupInstanceResponse', response)
          // this.FollowupInstance._identity_number = this.retrievedData['_id'] ?? '';
        })
        .catch((error) => {
          console.error("Error:", error);
        });


    }
  }


  seedFormControls() {
    this.FCTraveller["_id"] = new FormControl('', [Validators.required]);

  }

  seedFollowupFormControls() {
    this.FCFollowup["traveller_fever"] = new FormControl('', [Validators.required]);
    this.FCFollowup["traveller_diarrhoea"] = new FormControl('', [Validators.required]);
    this.FCFollowup["traveller_headache"] = new FormControl('', [Validators.required]);
    this.FCFollowup["traveller_joint_muscle_pains"] = new FormControl('', [Validators.required]);
    this.FCFollowup["traveller_bone_pain"] = new FormControl('', [Validators.required]);
    this.FCFollowup["traveller_unexplained_bruising"] = new FormControl('', [Validators.required]);
    this.FCFollowup["traveller_unusual_body_weakness"] = new FormControl('', [Validators.required]);
    this.FCFollowup["traveller_internal_external_bleeding"] = new FormControl('', [Validators.required]);
    this.FCFollowup["traveller_sore_painful_throat"] = new FormControl('', [Validators.required]);
    this.FCFollowup["traveller_cough_vomiting"] = new FormControl('', [Validators.required]);
    this.FCFollowup["traveller_common_cold"] = new FormControl('', [Validators.required]);
    this.FCFollowup["traveller_weight_loss"] = new FormControl('', [Validators.required]);
    this.FCFollowup["traveller_other_symptoms"] = new FormControl('', []);
  }



  toggleCard() {
    this.showCard = !this.showCard;
  }

  toggleFollowUps() {
    this.showFollowups = !this.showFollowups;
  }

  toggleFollowupDetails(index: number) {
    this.minimizedStates[index] = !this.minimizedStates[index];
  }

  resetFormControls(formControls: KVFormControl): void {
    Object.values(formControls).forEach(control => {
      control.reset();
    });
  }

}
