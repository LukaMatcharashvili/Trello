import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { TeamProxyService } from 'src/app/services/proxy/team-proxy.service';

@Component({
  selector: 'app-update-team-pg',
  templateUrl: './update-team-pg.component.html',
  styleUrls: ['./update-team-pg.component.css'],
})
export class UpdateTeamPgComponent implements OnInit {
  uploadedImg!: any;
  teamForm!: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private teamProxyS: TeamProxyService,
    private router: Router,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.teamProxyS.getTeamById(this.data.teamId).subscribe((response: any) => {
      this.uploadedImg = response.coverPicture;
      this.teamForm = new FormGroup({
        title: new FormControl<string | null>(
          response.title,
          Validators.required
        ),
        coverPicture: new FormControl<string | null>(null),
      });
    });
  }

  onImageUpload(event: any) {
    const reader = new FileReader();
    reader.onload = () => {
      this.uploadedImg = reader.result;
    };
    reader.readAsDataURL(event.target.files[0]);
  }

  onFormSubmit() {
    this.teamForm.value.coverPicture = this.uploadedImg;
    this.teamProxyS
      .updateTeam(this.data.teamId, this.teamForm.value)
      .subscribe((response: any) => {
        if (response) {
          this.dialog.closeAll();
          this.router.navigate(['myprofile']);
        }
      });
  }
}
