import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, retry, throwError } from 'rxjs';
import { api_config } from "../../config/api.config";

@Injectable({
    providedIn: 'root'
})

export class APICom {
    postProcess: any;
    response: any;
    _success: boolean = true;
    _server_api_error: string = '';

    constructor(private http: HttpClient) { }

    public request(com_endpoint: string, com_payload: any, postProcessData: any, errorCallback: (error: any) => void): void {
        com_endpoint = api_config.ENDPOINT + com_endpoint;
        this.postProcess = postProcessData;

        this.process(com_endpoint, com_payload).subscribe(
          response => {
            this.response = response;
            this.postProcess(response);
          },
          error => {
            // Handle error here
            this.handleError(error);
            errorCallback(error);
          }
        );
    }

    private process(com_endpoint: string, com_payload: any): Observable<any[]> {
        const com_options = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Access-Control-Allow-Headers': 'Content-Type',
            })
        };

        return this.http.post<any[]>(`${com_endpoint}`, com_payload, com_options).pipe(
            retry(1),
            catchError(this.handleError)
        );
    }

    private handleError(error: HttpErrorResponse) {
        this.response = -1;

        if (error.error instanceof ErrorEvent) {
            //Error! Client-side or network
            console.error('Error!', error.error.message);
        } else {
            //Error! Server-side
            console.error('Error!', error.error);
            this._success = false;
            this._server_api_error = "Please try again later.";
        }

        return throwError('Failed!');
    }
}
