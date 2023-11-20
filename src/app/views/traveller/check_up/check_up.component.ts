import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormControl, Validators } from '@angular/forms';

import { MErrorStateMatcher } from '../../../models/MErrorStateMatcher.model';
import {Traveller} from '../../../models/Traveller.model';
import {CheckUp} from '../../../models/Checkup.model';
import { KVFormControl } from '../../../models/KVFormControl.model';


@Component({
  templateUrl: 'check_up.component.html',
  styleUrls: ['check_up.component.scss'],
})

export class CheckUpComponent implements OnInit {
  matcher = new MErrorStateMatcher();
  TravellerInstance = new Traveller(this.http);
  CheckupInstance = new CheckUp(this.http);
  FCTraveller: KVFormControl = {};
  FCCheckup: KVFormControl = {};
  retrievedData: any;
  travellerData: any;
  checkUpData: any;
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
      this.resetFormControls(this.FCCheckup);
      this.TravellerInstance.getTravellerInstance()
        .then((response) => {
          this.retrievedData = response[0];
          this.travellerData = response[0];
          console.log('this.retrievedData: ',this.retrievedData)
          this.TravellerInstance._api_response = response[0];
          this.TravellerInstance._identity_number = this.retrievedData??['_id'] ?? '';
        })
        .catch((error) => {
          console.error("Get TravellerInstance Error:", error);
        });

      this.CheckupInstance._traveller_id = this.TravellerInstance._id;
      this.CheckupInstance.getTravellerCheckup()
        .then((checkUpResponse) => {
          this.checkUpData = checkUpResponse[0];
          this.CheckupInstance.doc = this.checkUpData?.doc;
        })
        .catch((error) => {
          console.error("Get CheckupInstance Error:", error);
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
      this.CheckupInstance._processing = true;
      // this.onValueChange();
      // console.log(this.FCCheckup['traveller_action_taken']);

      if(this.checkUpData){

        //update an existing checkup
        this.CheckupInstance.updateCheckup()
          .then((response) => {
            this.retrievedData = response[0];

            this.CheckupInstance._traveller_id = this.retrievedData['_id'] ?? '';
            this.showCard = false;
            this.resetFormControls(this.FCCheckup);
          })
          .catch((error) => {
            console.error("Error:", error);
          });

      }else {
        console.log('we create')
        //create a new checkup
        this.CheckupInstance.createCheckup()
          .then((response) => {
            this.retrievedData = response[0];
            this.CheckupInstance._traveller_id = this.retrievedData['_id'] ?? '';
            this.showCard = false;
            this.resetFormControls(this.FCCheckup);
          })
          .catch((error) => {
            console.error("Error:", error);
          });

      }
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
    this.FCCheckup["traveller_other_action_taken"] = new FormControl('', []);
    this.FCCheckup["_identity_number"] = new FormControl(this.retrievedData?._traveller_Id ?? '');
  }

  onValueChange(): void {
    const actionTakenControl = this.FCCheckup['traveller_action_taken'];
    const selectedValue = this.CheckupInstance.doc['traveller_action_taken'];

    if (actionTakenControl.value === 'other') {
      this.FCCheckup['traveller_action_taken'].setValue(this.FCCheckup['traveller_other_action_taken'].value);
    } else {
      // Clear the validation for other options

    }

    // Trigger validation
    actionTakenControl.updateValueAndValidity();
  }

  resetFormControls(formControls: KVFormControl): void {
    Object.values(formControls).forEach(control => {
      control.reset();
      control.setErrors(null);
    });
  }


  protected readonly Object = Object;

  toggleCard() {
    this.showCard = !this.showCard;
  }
}
