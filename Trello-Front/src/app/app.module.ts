import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgMaterialModule } from './ng-material.module';
import { HomePgComponent } from './view/home-pg/home-pg.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ProfilePgComponent } from './view/profile-pg/profile-pg.component';
import { LoginPgComponent } from './view/login-pg/login-pg.component';
import { RegisterPgComponent } from './view/register-pg/register-pg.component';
import { ResetPasswordPgComponent } from './view/reset-password-pg/reset-password-pg.component';
import { UpdateUserModComponent } from './view/update-user-mod/update-user-mod.component';
import { DeleteUserModComponent } from './view/delete-user-mod/delete-user-mod.component';
import { ForgotPasswordModComponent } from './view/forgot-password-mod/forgot-password-mod.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SearchPgComponent } from './view/search-pg/search-pg.component';
import { InviteToTeamModComponent } from './view/invite-to-team-mod/invite-to-team-mod.component';
import { AddTeamModComponent } from './view/add-team-mod/add-team-mod.component';
import { TeamPgComponent } from './view/team-pg/team-pg.component';
import { AddTodoModComponent } from './view/team-pg/add-todo-mod/add-todo-mod.component';
import { TodoDetailsPgComponent } from './view/team-pg/todo-details-pg/todo-details-pg.component';
import { TeamMembersPgComponent } from './view/team-pg/team-members-pg/team-members-pg.component';
import { UpdateTeamPgComponent } from './view/team-pg/update-team-pg/update-team-pg.component';
import { LoadingService } from './interceptors/loading.service';
import { LoaderInterceptorService } from './interceptors/loader-interceptor.service';

@NgModule({
  declarations: [
    AppComponent,
    HomePgComponent,
    ProfilePgComponent,
    LoginPgComponent,
    RegisterPgComponent,
    ResetPasswordPgComponent,
    UpdateUserModComponent,
    DeleteUserModComponent,
    ForgotPasswordModComponent,
    SearchPgComponent,
    InviteToTeamModComponent,
    AddTeamModComponent,
    TeamPgComponent,
    AddTodoModComponent,
    TodoDetailsPgComponent,
    TeamMembersPgComponent,
    UpdateTeamPgComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgMaterialModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    LoadingService,
    LoaderInterceptorService,
    {
      useClass: LoaderInterceptorService,
      provide: HTTP_INTERCEPTORS,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
