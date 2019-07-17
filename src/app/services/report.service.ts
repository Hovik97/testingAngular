import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class ReportService {
  private url = {
    createReport: '**********************'
  };
  constructor(private api: ApiService) { }

  createReport(file) {
    return this.api.post(this.url.createReport, file);
  }
}
