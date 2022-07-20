import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardReverseService } from './guards/auth-guard-reverse.service';
import { AuthGuardService } from './guards/auth-guard.service';
import { HomePgComponent } from './view/home-pg/home-pg.component';
import { LoginPgComponent } from './view/login-pg/login-pg.component';
import { ProfilePgComponent } from './view/profile-pg/profile-pg.component';
import { RegisterPgComponent } from './view/register-pg/register-pg.component';
import { ResetPasswordPgComponent } from './view/reset-password-pg/reset-password-pg.component';
import { SearchPgComponent } from './view/search-pg/search-pg.component';
import { TeamPgComponent } from './view/team-pg/team-pg.component';

const routes: Routes = [
  { path: '', component: HomePgComponent },
  {
    path: 'register',
    canActivate: [AuthGuardReverseService],
    component: RegisterPgComponent,
  },
  {
    path: 'login',
    canActivate: [AuthGuardReverseService],
    component: LoginPgComponent,
  },
  {
    path: 'myprofile',
    canActivate: [AuthGuardService],
    component: ProfilePgComponent,
  },
  {
    path: 'resetpassword/:userId/:resetToken',
    canActivate: [AuthGuardReverseService],
    component: ResetPasswordPgComponent,
  },
  {
    path: 'search/:searchBody',
    canActivate: [AuthGuardService],
    component: SearchPgComponent,
  },
  {
    path: 'team/:teamId',
    canActivate: [AuthGuardService],
    component: TeamPgComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
