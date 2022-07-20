import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { LocalStorageService } from '../local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class TeamProxyService {
  constructor(
    private proxy: HttpClient,
    private localStorageS: LocalStorageService
  ) {}

  sendUserInvitation(teamId: string, userId: string) {
    const fullUrl = `${environment.apiBaseUrl}/team/sendinvitation/${teamId}/${userId}`;
    const jwt: any = this.localStorageS.getWithExpiry('jwt');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${jwt}`);
    return this.proxy.get(fullUrl, { headers: headers });
  }

  getTeams() {
    const fullUrl = `${environment.apiBaseUrl}/team`;
    const jwt: any = this.localStorageS.getWithExpiry('jwt');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${jwt}`);
    return this.proxy.get(fullUrl, { headers: headers });
  }

  addTeam(teamData: any) {
    const fullUrl = `${environment.apiBaseUrl}/team`;
    const jwt: any = this.localStorageS.getWithExpiry('jwt');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${jwt}`);
    return this.proxy.post(fullUrl, teamData, { headers: headers });
  }

  deleteTeam(teamId: string) {
    const fullUrl = `${environment.apiBaseUrl}/team/deleteteam/${teamId}`;
    const jwt: any = this.localStorageS.getWithExpiry('jwt');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${jwt}`);
    return this.proxy.delete(fullUrl, { headers: headers });
  }

  getTeamById(teamId: string) {
    const fullUrl = `${environment.apiBaseUrl}/team/${teamId}`;
    const jwt: any = this.localStorageS.getWithExpiry('jwt');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${jwt}`);
    return this.proxy.get(fullUrl, { headers: headers });
  }

  updateLists(teamId: string, todo: any, done: any) {
    const fullUrl = `${environment.apiBaseUrl}/team/updatelists/${teamId}`;
    const jwt: any = this.localStorageS.getWithExpiry('jwt');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${jwt}`);
    return this.proxy.put(fullUrl, { todo, done }, { headers: headers });
  }

  getTeamMembers(teamId: string) {
    const fullUrl = `${environment.apiBaseUrl}/team/members/${teamId}`;
    const jwt: any = this.localStorageS.getWithExpiry('jwt');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${jwt}`);
    return this.proxy.get(fullUrl, { headers: headers });
  }

  updateTeam(teamId: string, teamData: any) {
    const fullUrl = `${environment.apiBaseUrl}/team/updateteam/${teamId}`;
    const jwt: any = this.localStorageS.getWithExpiry('jwt');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${jwt}`);
    return this.proxy.put(fullUrl, teamData, { headers: headers });
  }
}
