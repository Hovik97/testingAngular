import { Component, OnInit } from '@angular/core';
import { Global } from '../../../global/globals';
import { SuperAdminService } from '../../../services/superAdmin/super-admin.service';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent implements OnInit {
  public allReports = [];
  public reportsArrlength = false;
  public reportPageLength = 1;
  constructor(private supAdmService: SuperAdminService,
              public global: Global) { }

  ngOnInit() {
    localStorage.getItem('pageReports') ? this.reportPageLength = Number(localStorage.getItem('pageReports')) : localStorage.setItem('pageReports', '1');
    const obj = {
      skip: this.reportPageLength * 20 - 20
    };
    this.global.loader = true;
    this.supAdmService.getAllReports(obj).subscribe((res: any) => {
      if (res.length > 20) {
        this.reportsArrlength = true;
        res.splice(20);
      }
      this.allReports = res;
      this.global.loader = false;
    });
  }

  arrayOne(n: number): any[] {
    return Array(n);
  }

  changePageUser(page) {
    if (page === this.reportPageLength) { return; }
    switch (page) {
      case '-1':
        this.reportPageLength -= 1;
        localStorage.setItem('pageReports', this.reportPageLength.toString());
        break;
      case '+1':
        this.reportPageLength += 1;
        localStorage.setItem('pageReports', this.reportPageLength.toString());
        break;
      default:
        this.reportPageLength = page;
        localStorage.setItem('pageReports', this.reportPageLength.toString());
    }
    const obj = {
      skip: this.reportPageLength * 20 - 20
    };
    this.global.loader = true;
    this.supAdmService.getAllReports(obj).subscribe((res: any) => {
      if (res.length > 20) {
        this.reportsArrlength = true;
        res.splice(20);
        this.allReports = res;
      } else {
        this.reportsArrlength = false;
        this.allReports = res;
      }
      this.global.loader = false;
    });
  }

}
