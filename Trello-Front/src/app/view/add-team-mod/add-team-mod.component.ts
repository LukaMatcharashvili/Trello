import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AddTeamEmitterService } from 'src/app/services/emitters/add-team-emitter.service';
import { TeamProxyService } from 'src/app/services/proxy/team-proxy.service';

@Component({
  selector: 'app-add-team-mod',
  templateUrl: './add-team-mod.component.html',
  styleUrls: ['./add-team-mod.component.css'],
})
export class AddTeamModComponent implements OnInit {
  uploadedImg!: any;

  constructor(
    private teamProxyS: TeamProxyService,
    private router: Router,
    private dialog: MatDialog,
    private addTeamEmitter: AddTeamEmitterService
  ) {}

  ngOnInit(): void {}

  teamForm: FormGroup = new FormGroup({
    title: new FormControl<string | null>(null, Validators.required),
    coverPicture: new FormControl<string | null>(null),
  });

  onImageUpload(event: any) {
    const reader = new FileReader();
    reader.onload = () => {
      this.uploadedImg = reader.result;
    };
    reader.readAsDataURL(event.target.files[0]);
  }

  onFormSubmit() {
    this.teamForm.value.coverPicture = this.uploadedImg;
    this.teamProxyS.addTeam(this.teamForm.value).subscribe((response: any) => {
      if (response) {
        this.dialog.closeAll();
        this.addTeamEmitter.addTeamEmitter.emit(response);
        this.router.navigate(['myprofile']);
      }
    });
  }
}
