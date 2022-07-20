import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-todo-details-pg',
  templateUrl: './todo-details-pg.component.html',
  styleUrls: ['./todo-details-pg.component.css'],
})
export class TodoDetailsPgComponent implements OnInit {
  todo: any = {};
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    this.todo = data;
  }

  ngOnInit(): void {}
}
