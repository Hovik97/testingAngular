import { Injectable } from '@angular/core';
import { ApiService } from '../api.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SuperAdminService {
  private url = {
    getCompanies: '**********************',
    getUsers: '**********************',
    getReports: '**********************'
  };
  constructor(private api: ApiService) { }

  getComp(compData: object): Observable <any> {
    return Observable.create(observer => {
      this.api.post(this.url.getCompanies, compData).subscribe((data: any) => {
        observer.next(data);
        observer.complete();
      });
    });
  }

  getUser(userData: object): Observable <any> {
    return Observable.create(observer => {
      this.api.post(this.url.getUsers, userData).subscribe((data: any) => {
        observer.next(data);
        observer.complete();
      });
    });
  }

  getAllReports(userData: object): Observable <any> {
    return Observable.create(observer => {
      this.api.post(this.url.getReports, userData).subscribe((data: any) => {
        observer.next(data);
        observer.complete();
      });
    });
  }

}
