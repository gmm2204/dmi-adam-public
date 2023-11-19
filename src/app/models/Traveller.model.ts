import { HttpClient } from '@angular/common/http';
import { MKeyValue } from "../models/MKeyValue.model";
import { api_config } from 'src/config/api.config';
import { APICom } from "./APICom.model";


export class Traveller {
  _id: number = 0;
  _identity_type: string = "";
  _identity_number: string = "";
  traveller_body_temperature: number = 0;
  doc: MKeyValue = {};
  api: APICom = new APICom(this.http);

  _processing: boolean = false;
  _api_response: MKeyValue = {};
  _api_error: any;

  constructor(private http: HttpClient) {
    // this._id = -1;
  }

  createInstance() {
    console.log(this.doc);
    this.api.request(api_config.ENDPOINT_TRAVELLER + "/create",
      {
        "_id": this._id,
        "_identity_type": this._identity_type,
        "_identity_number": this._identity_number,
        "doc": this.doc,
      },
      (response: any) => {
        this._api_response = response[0];
        this._processing = false;
        this._api_error = null;
      }, (error: any) => {
        console.error('Error during createInstance:', error);
        this._processing = this.api._success;
        this._api_error = this.api._server_api_error;
      });
  }

  getTravellerInstance(): Promise<any> {
    return new Promise((resolve, reject) => {
      try {
        this.api.request(api_config.ENDPOINT_TRAVELLER + "/acquire/instance",
          {
            "_id": this._id
          }, (response: any) => {
            if(response._api_response)
            this._api_response = response;
            this._processing = false;
            this._api_error = null;
            resolve(response);
          },
          (error: any) => {
            this._processing = this.api._success;
            this._api_error = this.api._server_api_error;
            reject(error);
          });
      } catch (error) {
        console.error('Error during getTravellerInstance:', error);
        reject(error);
      }
    });
  }


}

