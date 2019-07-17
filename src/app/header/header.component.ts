import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { Global } from '../global/globals';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Input() user: any = {};

  constructor(
    private authService: AuthService,
    private router: Router,
    public global: Global
  ) { }

  ngOnInit() {
  }

  logout(): void {
    this.global.authenticationUser = null;
    this.authService.signOut();
    this.navigate('/login');
  }

  navigate(link): void {
    this.router.navigate([link]);
  }

}
