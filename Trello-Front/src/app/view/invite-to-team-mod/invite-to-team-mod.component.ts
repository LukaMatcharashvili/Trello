import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TeamProxyService } from 'src/app/services/proxy/team-proxy.service';

@Component({
  selector: 'app-invite-to-team-mod',
  templateUrl: './invite-to-team-mod.component.html',
  styleUrls: ['./invite-to-team-mod.component.css'],
})
export class InviteToTeamModComponent implements OnInit {
  teams: any[] = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private teamProxyS: TeamProxyService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.getTeams();
  }

  getTeams() {
    this.teamProxyS.getTeams().subscribe((response: any) => {
      this.teams = response;
    });
  }

  onInviteBtnClick(teamId: any) {
    this.teamProxyS
      .sendUserInvitation(teamId, this.data.userId)
      .subscribe((response: any) => {
        if (response) {
          this.dialog.closeAll();
          this.snackBar.open('Invitation Has Been Sent!', 'OK!');
        }
      });
  }
}
