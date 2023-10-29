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

    constructor(private http: HttpClient) { }

    public request(com_endpoint: string, com_payload: any, postProcessData: any): void {
        com_endpoint = api_config.ENDPOINT + com_endpoint;
        this.postProcess = postProcessData;

        this.process(com_endpoint, com_payload).subscribe(
            response => {
                this.response = response;
                this.postProcess(response);
            });
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
            console.error('Error!', error.error.message);
        }

        return throwError('Failed!');
    }
}