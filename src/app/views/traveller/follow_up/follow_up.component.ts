import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormControl, Validators } from '@angular/forms';

import { MErrorStateMatcher } from '../../../models/MErrorStateMatcher.model';
import { Traveller } from '../../../models/Traveller.model';
import { KVFormControl } from '../../../models/KVFormControl.model';

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
  protected readonly Object = Object;

  constructor(private http: HttpClient) { }

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
      this.TravellerInstance.getTravellerInstance()
        .then((response) => {
          this.retrievedData = response[0];

          this.TravellerInstance._identity_number = this.retrievedData['_id'] ?? '';
          this.seedFollowupFormControls()
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  }

  onSubmitFollowup(): void {
    let is_valid = true;

    console.log(this.TravellerInstance)
    Object.keys(this.FCFollowup).forEach(fc_key => {
      if (this.FCFollowup[fc_key].hasError("required")) {
        is_valid = false;
        return;
      }
    });

    if (is_valid) {
      this.TravellerInstance._processing = true;
      this.TravellerInstance.createFollowup()
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
}
