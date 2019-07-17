import { Component, OnInit } from '@angular/core';
import { Global } from '../global/globals';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-super-admin',
  templateUrl: './super-admin.component.html',
  styleUrls: ['./super-admin.component.scss']
})
export class SuperAdminComponent implements OnInit {
  public positionPage: boolean = false;
  public sidebarMenu = [
    {
      title: 'Companies',
      link: 'company',
      classIcon: 'fas fa-briefcase icon-sidebar'
    }, {
      title: 'Reports',
      link: 'reports',
      classIcon: 'far fa-file-alt icon-sidebar'
    }, {
      title: 'Users',
      link: 'users',
      classIcon: 'fas fa-users icon-sidebar'
    }
  ];
  constructor(public global: Global, private route: ActivatedRoute, private location: Location) {
    this.route.data.subscribe(params => {
      if (this.global.authenticationUser.roles !== params.title) {
        this.location.back();
      }
    });
  }

  ngOnInit() {
  }

  public changePosition() {
    this.positionPage = !this.positionPage;
  }

}
