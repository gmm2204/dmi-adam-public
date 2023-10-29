import { HttpClient } from '@angular/common/http';
import { MKeyValue } from "../models/MKeyValue.model";
import { api_config } from 'src/config/api.config';
import { APICom } from "./APICom.model";

export class Traveller {
  _id: number = -1;
  _identity_type: string = "";
  _identity_number: string = "";
  doc: MKeyValue = {};
  api: APICom = new APICom(this.http);
  
  _processing: boolean = false;
  _api_response: MKeyValue = {};

  constructor(private http: HttpClient) {

  }

  createInstance() {
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
      });
  }
}