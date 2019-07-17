import { Component, OnInit } from '@angular/core';
import {SuperAdminService} from '../../../services/superAdmin/super-admin.service';
import {Global} from '../../../global/globals';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  public allUsers = [];
  public usersArrlength = false;
  public userPageLength = 1;
  constructor(private supAdmService: SuperAdminService,
              public global: Global) { }

  ngOnInit() {
    localStorage.getItem('pageUsers') ? this.userPageLength = Number(localStorage.getItem('pageUsers')) : localStorage.setItem('pageUsers', '1');
    const obj = {
      skip: this.userPageLength * 8 - 8,
    };
    this.global.loader = true;
    this.supAdmService.getUser(obj).subscribe((res: any) => {
      if (res.length > 8) {
        this.usersArrlength = true;
        res.splice(8);
      }
      this.allUsers = res;
      this.global.loader = false;
    });
  }

  arrayOne(n: number): any[] {
    return Array(n);
  }

  changePageUser(page) {
    if (page === this.userPageLength) { return; }
    switch (page) {
      case '-1':
        this.userPageLength -= 1;
        localStorage.setItem('pageUsers', this.userPageLength.toString());
        break;
      case '+1':
        this.userPageLength += 1;
        localStorage.setItem('pageUsers', this.userPageLength.toString());
        break;
      default:
        this.userPageLength = page;
        localStorage.setItem('pageUsers', this.userPageLength.toString());
    }
    const obj = {
      skip: this.userPageLength * 8 - 8
    };
    this.global.loader = true;
    this.supAdmService.getUser(obj).subscribe((res: any) => {
      if (res.length > 8) {
        this.usersArrlength = true;
        res.splice(8);
        this.allUsers = res;
      } else {
        this.usersArrlength = false;
        this.allUsers = res;
      }
      this.global.loader = false;
    });
  }

}
