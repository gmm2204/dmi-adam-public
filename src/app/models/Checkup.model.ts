import {MKeyValue} from "./MKeyValue.model";
import {APICom} from "./APICom.model";
import {HttpClient} from "@angular/common/http";
import {api_config} from "../../config/api.config";

export class Checkup {
  _id: number ;
  _identity_type: string = "";
  _identity_number: string = "";
  traveller_body_temperature: number = 0;
  doc: MKeyValue = {};
  api: APICom = new APICom(this.http);

  _processing: boolean = false;
  _api_response: MKeyValue = {};

  constructor(private http: HttpClient) {
    this._id = -1;
  }

  createCheckup(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.api.request(api_config.ENDPOINT_TRAVELLER + "/create-checkup",
        {
          "_traveller_id": this._identity_number,
          "doc": this.doc,
        }, (response: any) => {

          this._api_response = response;
          this._processing = false;
          resolve(response);
        });
    });
  }



}

