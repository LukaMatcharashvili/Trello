import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TeamProxyService } from 'src/app/services/proxy/team-proxy.service';

@Component({
  selector: 'app-team-members-pg',
  templateUrl: './team-members-pg.component.html',
  styleUrls: ['./team-members-pg.component.css'],
})
export class TeamMembersPgComponent implements OnInit {
  members: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private teamProxyS: TeamProxyService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.teamProxyS
      .getTeamMembers(this.data.teamId)
      .subscribe((response: any) => {
        this.members = response;
      });
  }

  onMemberDeleteBtnClick(memberIdx: any) {
    this.members.splice(memberIdx, 1);
    this.teamProxyS
      .updateTeam(this.data._id, { members: this.members })
      .subscribe((response: any) => {
        if (response) {
          this.dialog.closeAll();
        }
      });
  }
}
