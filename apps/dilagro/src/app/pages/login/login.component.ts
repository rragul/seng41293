import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import { Router } from '@angular/router';
import { FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'seng41293-login',
  standalone: true,
  imports: [CommonModule, MatInputModule, MatButtonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  error='';
  emailCtrl = new FormControl('',[Validators.required, Validators.email]);
  passwordCtrl = new FormControl('',[Validators.required, Validators.minLength(6)]);
  formGroup = new FormGroup({
    email: this.emailCtrl,
    password: this.passwordCtrl,
  });

  constructor(private router: Router) {  }

  onLogin() {
    console.log(this.formGroup.value);
    this.router.navigate(['/admin']);
  }
}
