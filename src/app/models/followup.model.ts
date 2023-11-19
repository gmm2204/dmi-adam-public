import {MKeyValue} from "./MKeyValue.model";
import {APICom} from "./APICom.model";
import {HttpClient} from "@angular/common/http";
import {api_config} from "../../config/api.config";

export class Followup {

  _id: number = 0 ;
  _traveller_id: number = 0;
  doc: MKeyValue = {};

  api: APICom = new APICom(this.http);

  _processing: boolean = false;
  _api_response: MKeyValue = {};
  _api_error: any;
  constructor(private http: HttpClient) {

  }


  getTravellerFollowup(): Promise<any> {
    return new Promise((resolve, reject) => {
      try {
        this.api.request(api_config.ENDPOINT_TRAVELLER + "/get-followup",
          {
            "_traveller_id": this._traveller_id
          },
          (response: any) => {

            this._api_response = response;
            this._processing = false;
            this._api_error = null;
            resolve(response);
          },
          (error: any) => {
            this._processing = this.api._success;
            this._api_error = this.api._server_api_error;
          });
      } catch (error) {
        console.error('Error during getTravellerInstance:', error);
        reject(error);
      }
    });
  }

  createFollowup(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.api.request(api_config.ENDPOINT_TRAVELLER + "/create-followup",
        {
          "_traveller_id": this._traveller_id,
          "doc": this.doc,
        },
        (response: any) => {
          this._api_response = response;
          this._processing = false;
          this._api_error = null;
          resolve(response);
        }, (error: any) => {
          this._processing = this.api._success;
          this._api_error = this.api._server_api_error;
          reject(error);
        });
    });
  }
}
