import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AddTodoEmitterService {
  constructor() {}

  addTodoEmitter: EventEmitter<any> = new EventEmitter();
}
