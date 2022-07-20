import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { UserProxyService } from 'src/app/services/proxy/user-proxy.service';
import { InviteToTeamModComponent } from '../invite-to-team-mod/invite-to-team-mod.component';

@Component({
  selector: 'app-search-pg',
  templateUrl: './search-pg.component.html',
  styleUrls: ['./search-pg.component.css'],
})
export class SearchPgComponent implements OnInit {
  searchBody: string = '';
  users: any = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private userProxyS: UserProxyService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params: any) => {
      this.searchUser(params.searchBody);
    });
  }

  searchUser(searchBody: string) {
    this.userProxyS.getUsersBySearch(searchBody).subscribe((response: any) => {
      this.users = response;
    });
  }

  onUserInviteBtnClick(userId: string) {
    this.dialog.open(InviteToTeamModComponent, {
      data: {
        userId: userId,
      },
    });
  }
}
