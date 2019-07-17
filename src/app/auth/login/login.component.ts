import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Global } from '../../global/globals';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;
  public submitted = false;
  constructor(private authService: AuthService,
              private router: Router,
              private formBuilder: FormBuilder,
              public global: Global) { }

  ngOnInit() {
    this.authService.me().subscribe(data => {
      this.global.authenticationUser = data.user;
      this.router.navigateByUrl('/' + data.user.roles);
    });
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  get f() { return this.loginForm.controls; }

  login() {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }
    const log = this.loginForm.value;
    this.authService.login(log.email, log.password).subscribe(data => {
      this.global.authenticationUser = data.user;
      this.router.navigateByUrl('/' + data.user.roles);
    });
  }

}
