import { Component, OnInit } from '@angular/core';
import { Global } from '../globals';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  public changeSettings: FormGroup;
  public newPassword;
  public cloneUser;
  public submitted = false;
  constructor(private formBuilder: FormBuilder,
              private location: Location,
              public global: Global,
              private authService: AuthService) { }

  ngOnInit() {
    this.cloneUser = Object.assign({}, this.global.authenticationUser);
    this.cloneUser.password = '';
    delete this.cloneUser.roles;
    delete this.cloneUser.email;
    delete this.cloneUser.companyID;
    delete this.cloneUser.permissions;
    this.changeSettings = this.formBuilder.group({
      name: [this.cloneUser.name, Validators.required],
      surname: [this.cloneUser.surname, Validators.required],
      password: [this.cloneUser.password, [Validators.required, Validators.minLength(6)]]
    });
  }

  get s() { return this.changeSettings.controls; }

  changeProfileSettings() {
    this.submitted = true;
    if (this.changeSettings.invalid) {
      return;
    }
    if (this.newPassword) {
      this.changeSettings.value.newPassword = this.newPassword;
    }
    this.changeSettings.value._id = this.global.authenticationUser._id;
    this.global.loader = true;
    this.authService.changeSettings(this.changeSettings.value).subscribe((res: any) => {
      delete this.changeSettings.value.newPassword;
      this.global.authenticationUser = res;
      this.global.loader = false;
    });
  }

  cencelAddCompany() {
    this.location.back();
  }

}
