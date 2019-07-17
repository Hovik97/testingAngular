import { Component, OnInit } from '@angular/core';
import { SuperAdminService } from '../../../services/superAdmin/super-admin.service';
import { Global } from '../../../global/globals';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.scss']
})
export class CompanyComponent implements OnInit {
  public companies = [];
  public companyArrlength = false;
  public compPageLength = 1;
  constructor(private supAdmService: SuperAdminService,
              public global: Global) { }

  ngOnInit() {
    localStorage.getItem('pageComp') ? this.compPageLength = Number(localStorage.getItem('pageComp')) : localStorage.setItem('pageComp', '1');
    const obj = {
      skip: this.compPageLength * 8 - 8,
    };
    this.global.loader = true;
    this.supAdmService.getComp(obj).subscribe((res: any) => {
      if (res.length > 8) {
        this.companyArrlength = true;
        res.splice(8);
      }
      this.companies = res;
      this.global.loader = false;
    });
  }

  arrayOne(n: number): any[] {
    return Array(n);
  }

  changePageComp(page) {
    if (page === this.compPageLength) { return; }
    switch (page) {
      case '-1':
        this.compPageLength -= 1;
        localStorage.setItem('pageComp', this.compPageLength.toString());
        break;
      case '+1':
        this.compPageLength += 1;
        localStorage.setItem('pageComp', this.compPageLength.toString());
        break;
      default:
        this.compPageLength = page;
        localStorage.setItem('pageComp', this.compPageLength.toString());
    }
    const obj = {
      skip: this.compPageLength * 8 - 8
    };
    this.global.loader = true;
    this.supAdmService.getComp(obj).subscribe((res: any) => {
      if (res.length > 8) {
        this.companyArrlength = true;
        res.splice(8);
        this.companies = res;
      } else {
        this.companyArrlength = false;
        this.companies = res;
      }
      this.global.loader = false;
    });
  }

}
