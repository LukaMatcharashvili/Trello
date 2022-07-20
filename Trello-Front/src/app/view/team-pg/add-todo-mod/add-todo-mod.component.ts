import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddTodoEmitterService } from 'src/app/services/emitters/add-todo-emitter.service';

@Component({
  selector: 'app-add-todo-mod',
  templateUrl: './add-todo-mod.component.html',
  styleUrls: ['./add-todo-mod.component.css'],
})
export class AddTodoModComponent implements OnInit {
  constructor(
    private dialog: MatDialog,
    private addTodoEmitter: AddTodoEmitterService
  ) {}
  ngOnInit(): void {}
  onNewToDoAddBtnClick(data: any) {
    this.addTodoEmitter.addTodoEmitter.emit(data);
    this.dialog.closeAll();
  }
}
