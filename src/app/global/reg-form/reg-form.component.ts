import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { Global } from '../globals';

@Component({
  selector: 'app-reg-form',
  templateUrl: './reg-form.component.html',
  styleUrls: ['./reg-form.component.scss']
})
export class RegFormComponent implements OnInit {
  public registerForm: FormGroup;
  public submitted = false;
  @Output() formValue: EventEmitter<any> = new EventEmitter();
  constructor(private formBuilder: FormBuilder,
              private location: Location,
              public global: Global) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      name: ['', Validators.required],
      surname: ['', Validators.required],
      create: [false, Validators.required],
      edit: [false, Validators.required],
      view: [false, Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  get r() { return this.registerForm.controls; }

  cencelAddCompany() {
    this.location.back();
  }

  emitData() {
    this.submitted = true;
    if (this.registerForm.invalid) {
        this.formValue.emit(false);
        return;
    }
    this.registerForm.value.permissions = {
      create: this.registerForm.value.create,
      edit: this.registerForm.value.edit,
      view: this.registerForm.value.view
    };
    delete this.registerForm.value.create;
    delete this.registerForm.value.edit;
    delete this.registerForm.value.view;
    this.formValue.emit(this.registerForm.value);
    this.registerForm.reset({create: false, edit: false, view: false});
  }

}
