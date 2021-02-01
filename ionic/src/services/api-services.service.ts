import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const baseUrl = "http://127.0.0.1:8080/video";

@Injectable({
    providedIn: 'root'
})
export class ApiService {
    constructor(private http: HttpClient) {};

    getAllAnalysis(): Observable<any> {
        return this.http.get(baseUrl);
    }

    getAnalysisByVidId(id): Observable<any> {
        return this.http.get(`${baseUrl}/${id}`)
    }
}