import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AddTeamEmitterService } from 'src/app/services/emitters/add-team-emitter.service';
import { LoginLogoutEmitterService } from 'src/app/services/emitters/login-logout-emitter.service';
import { AuthProxyService } from 'src/app/services/proxy/auth-proxy.service';
import { TeamProxyService } from 'src/app/services/proxy/team-proxy.service';
import { AddTeamModComponent } from '../add-team-mod/add-team-mod.component';
import { DeleteUserModComponent } from '../delete-user-mod/delete-user-mod.component';
import { UpdateUserModComponent } from '../update-user-mod/update-user-mod.component';

@Component({
  selector: 'app-profile-pg',
  templateUrl: './profile-pg.component.html',
  styleUrls: ['./profile-pg.component.css'],
})
export class ProfilePgComponent implements OnInit {
  userData: any = {};
  teams!: any;

  constructor(
    private authProxyS: AuthProxyService,
    private dialog: MatDialog,
    private router: Router,
    private loginoutEmitter: LoginLogoutEmitterService,
    private teamProxyS: TeamProxyService,
    private addTeamEmitter: AddTeamEmitterService
  ) {}

  ngOnInit(): void {
    this.addTeamEmitter.addTeamEmitter.subscribe((response) => {
      this.teams.push(response);
    });
    this.getUser();
    this.getTeams();
  }

  getUser() {
    this.authProxyS.whoami().subscribe((response) => {
      this.userData = response;
    });
  }

  openDeleteUserModuleBtnClick() {
    this.dialog.open(DeleteUserModComponent);
  }

  openUpdateUserFormBtnClick() {
    this.dialog.open(UpdateUserModComponent);
  }

  logOut() {
    localStorage.removeItem('jwt');
    this.loginoutEmitter.loginlogoutEmitter.emit(false);
    this.router.navigate(['login']);
  }

  getTeams() {
    this.teamProxyS.getTeams().subscribe((response: any) => {
      this.teams = response;
    });
  }

  onAddTeamBtnClick() {
    this.dialog.open(AddTeamModComponent);
  }

  onTeamDeleteBtnClick(teamId: any) {
    this.teamProxyS.deleteTeam(teamId).subscribe((response: any) => {
      this.getTeams();
    });
  }
}
