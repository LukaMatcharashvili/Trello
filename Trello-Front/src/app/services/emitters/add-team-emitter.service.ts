import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AddTeamEmitterService {
  constructor() {}
  addTeamEmitter: EventEmitter<any> = new EventEmitter();
}
