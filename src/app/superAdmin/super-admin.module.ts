import { NgModule } from '@angular/core';
import { SuperAdminRoutingModule, superAdminComponents } from './super-admin-routing.module';
import { SideBarModule } from '../side-bar/side-bar.module';
import { SharedModule } from '../shared/shared.module';
import { AuthService } from '../auth/auth.service';
import { SuperAdminService } from '../services/superAdmin/super-admin.service';
import { ApiService } from '../services/api.service';
import { ReportService } from '../services/report.service';

@NgModule({
  imports: [
    SuperAdminRoutingModule,
    SideBarModule,
    SharedModule
  ],
  declarations: [superAdminComponents],
  providers: [
    AuthService,
    SuperAdminService,
    ReportService,
    ApiService
  ]
})
export class SuperAdminModule { }
