import { Component, OnInit } from '@angular/core';
import { Global } from './global/globals';
import { Router } from '@angular/router';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(
    public global: Global,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.authService.me().subscribe(data => {
      this.global.authenticationUser = data.user;
    });
  }

}
