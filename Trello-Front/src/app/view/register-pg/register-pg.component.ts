import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthProxyService } from 'src/app/services/proxy/auth-proxy.service';

@Component({
  selector: 'app-register-pg',
  templateUrl: './register-pg.component.html',
  styleUrls: ['./register-pg.component.css'],
})
export class RegisterPgComponent implements OnInit {
  hide = true;

  uploadedImg!: any;

  constructor(
    private authProxyS: AuthProxyService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {}

  userForm: FormGroup = new FormGroup({
    username: new FormControl<string | null>(null, Validators.required),
    email: new FormControl<string | null>(null, [
      Validators.required,
      Validators.email,
    ]),
    image: new FormControl<string | null>(null),
    password: new FormControl<string | null>(null, Validators.required),
    confirmPassword: new FormControl<string | null>(null, Validators.required),
  });

  onImageUpload(event: any) {
    const reader = new FileReader();
    reader.onload = () => {
      this.uploadedImg = reader.result;
    };
    reader.readAsDataURL(event.target.files[0]);
  }

  onFormSubmit() {
    this.userForm.value.image = this.uploadedImg;
    this.authProxyS.registerUser(this.userForm.value).subscribe(
      (response) => {
        if (response) {
          this.snackBar.open(
            'Link Has Been Sent On Your Email, You Can Click On It And Email Will Be Verified!',
            'Ok!'
          );
          this.router.navigate(['login']);
        }
      },
      (error) => {
        this.snackBar.open(error.error.message, 'Ok!');
      }
    );
  }
}
