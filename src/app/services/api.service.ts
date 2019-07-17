import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private _http: HttpClient) { }

  get(url: string) {
    return this._http.get(url);
  }

  post(url: string, data: any) {
    return this._http.post(url, data);
  }

  put(url: string, data: any) {
    return this._http.put(url, data);
  }

}
