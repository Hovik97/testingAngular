import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { AuthService } from './auth.service';
import { TokenStorage } from './token.storage';
import { AuthRoutingModule, authComponents } from './auth-routing.module';
import { ApiService } from '../services/api.service';


@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    AuthRoutingModule
  ],
  declarations: [
    authComponents
  ],
  providers: [
    AuthService,
    TokenStorage,
    ApiService
  ],
  exports: []
})
export class AuthModule { }
