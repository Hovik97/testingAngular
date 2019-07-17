import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MustMatch } from '../../../../global/validatorPass';
import { Location } from '@angular/common';
import { Global } from '../../../../global/globals';
import { AuthService } from '../../../../auth/auth.service';

@Component({
  selector: 'app-add-new-company',
  templateUrl: './add-new-company.component.html',
  styleUrls: ['./add-new-company.component.scss']
})
export class AddNewCompanyComponent implements OnInit {
  public createCompany: FormGroup;
  public submitted: boolean = false;
  constructor(private formBuilder: FormBuilder,
              private location: Location,
              public global: Global,
              private authService: AuthService) { }

  ngOnInit() {
    this.createCompany = this.formBuilder.group({
      companyName: ['', Validators.required],
      companyAddress: ['', Validators.required],
      companyTaxNumber: ['', Validators.required],
      companyPhoneNumber: ['', Validators.required],
      companyType: ['', Validators.required],
      companyEmail: ['', [Validators.required, Validators.email]]
    });
  }

  get c() { return this.createCompany.controls; }

  regCompany(e) {
    this.submitted = true;
    if (!e || this.createCompany.invalid) {
      return;
    }
    this.global.loader = true;
    e.roles = 'admin';
    const obj = {
      user: e,
      company: this.createCompany.value
    };
    this.authService.register('api/superAdmin/create/user/and/company', obj).subscribe((res: any) => {
      this.createCompany.reset();
      this.global.loader = false;
    });
  }

}
