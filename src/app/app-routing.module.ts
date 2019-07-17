import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth-guard.service';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  { path: 'login', loadChildren: 'app/auth/auth.module#AuthModule' },
  { path: 'superAdmin', canActivate: [AuthGuard], loadChildren: 'app/superAdmin/super-admin.module#SuperAdminModule', data: {
      title: 'superAdmin'
    } },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule],
  providers: [AuthGuard],
  declarations: []
})

export class AppRoutingModule {}
export let routerComponents = [PageNotFoundComponent];
