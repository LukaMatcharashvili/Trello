import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { AddTodoEmitterService } from 'src/app/services/emitters/add-todo-emitter.service';
import { TeamProxyService } from 'src/app/services/proxy/team-proxy.service';
import { AddTodoModComponent } from './add-todo-mod/add-todo-mod.component';
import { TeamMembersPgComponent } from './team-members-pg/team-members-pg.component';
import { TodoDetailsPgComponent } from './todo-details-pg/todo-details-pg.component';
import { UpdateTeamPgComponent } from './update-team-pg/update-team-pg.component';

@Component({
  selector: 'app-team-pg',
  templateUrl: './team-pg.component.html',
  styleUrls: ['./team-pg.component.css'],
})
export class TeamPgComponent implements OnInit {
  todo: any = [];
  done: any = [];
  team: any = {};

  constructor(
    private teamProxyS: TeamProxyService,
    private activatedRoute: ActivatedRoute,
    private dialog: MatDialog,
    private addTodoEmitter: AddTodoEmitterService
  ) {}

  ngOnInit(): void {
    this.addTodoEmitter.addTodoEmitter.subscribe((response: any) => {
      this.todo.push(response);
      this.teamProxyS
        .updateLists(this.team._id, this.todo, this.done)
        .subscribe((res: any) => {});
    });
    this.activatedRoute.params.subscribe((params: any) => {
      this.getTeam(params.teamId);
    });
  }

  onAddTeamBtnClick() {
    this.dialog.open(AddTodoModComponent);
  }

  getTeam(teamId: any) {
    this.teamProxyS.getTeamById(teamId).subscribe((response: any) => {
      this.team = response;
      this.todo = response.todo;
      this.done = response.done;
    });
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
    this.teamProxyS
      .updateLists(this.team._id, this.todo, this.done)
      .subscribe((response: any) => {});
  }
  onToDoItem(index: any) {
    this.todo.splice(index, 1);
    this.teamProxyS
      .updateLists(this.team._id, this.todo, this.done)
      .subscribe((response: any) => {
        if (response) {
          this.getTeam(this.team._id);
        }
      });
  }
  onDoneItem(index: any) {
    this.done.splice(index, 1);
    this.teamProxyS
      .updateLists(this.team._id, this.todo, this.done)
      .subscribe((response: any) => {
        if (response) {
          this.getTeam(this.team._id);
        }
      });
  }
  onToDoSeeDetailsBtnClick(index: any) {
    this.dialog.open(TodoDetailsPgComponent, {
      data: this.todo[index],
    });
  }
  onDoneSeeDetailsBtnClick(index: any) {
    this.dialog.open(TodoDetailsPgComponent, {
      data: this.done[index],
    });
  }

  onSeeMembersBtnClick() {
    this.dialog.open(TeamMembersPgComponent, {
      data: {
        teamId: this.team._id,
        team: this.team,
      },
    });
  }

  onMemberUpdateBtnClick() {
    this.dialog.open(UpdateTeamPgComponent, {
      data: { teamId: this.team._id },
    });
  }
}
