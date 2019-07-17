import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SuperAdminComponent } from './super-admin.component';
import { DashboardComponent } from './superAdminChildComponents/dashboard/dashboard.component';
import { CompanyComponent } from './superAdminChildComponents/company/company.component';
import { ReportComponent } from './superAdminChildComponents/report/report.component';
import { UsersComponent } from './superAdminChildComponents/users/users.component';
import { AddNewCompanyComponent } from './superAdminChildComponents/company/add-new-company/add-new-company.component';
import { ProfileSuperAdminComponent } from './superAdminChildComponents/profile-super-admin/profile-super-admin.component';
import { AddNewReportSupComponent } from './superAdminChildComponents/report/add-new-report-sup/add-new-report-sup.component';

const routes: Routes = [
  { path: '', component: SuperAdminComponent, children: [
      { path: '', component: DashboardComponent },
      { path: 'addCompany', component: AddNewCompanyComponent },
      { path: 'addReport', component: AddNewReportSupComponent },
      { path: 'company', component: CompanyComponent },
      { path: 'profile', component: ProfileSuperAdminComponent },
      { path: 'reports', component: ReportComponent },
      { path: 'users', component: UsersComponent }
  ] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SuperAdminRoutingModule { }
export let superAdminComponents = [
  SuperAdminComponent,
  DashboardComponent,
  CompanyComponent,
  ReportComponent,
  UsersComponent,
  AddNewCompanyComponent,
  ProfileSuperAdminComponent,
  AddNewReportSupComponent];
