import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'seng41293-login',
  standalone: true,
  imports: [CommonModule, MatInputModule, MatButtonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  error = '';
  emailCtrl = new FormControl('', [Validators.required, Validators.email]);
  passwordCtrl = new FormControl('', [Validators.required, Validators.minLength(6)]);
  formGroup = new FormGroup({
    email: this.emailCtrl,
    password: this.passwordCtrl,
  });

  constructor(
    private router: Router,
    private angularFireAuth: AngularFireAuth
  ) { }

  async onLogin() {
    const email = this.formGroup.get('email')?.value as string;
    const password = this.formGroup.get('password')?.value as string;

    try {
      await this.angularFireAuth.signInWithEmailAndPassword(email, password);
      this.router.navigate(['/admin']);
    } catch (error) {
      // Handle login error
      this.error = 'Login failed. Please check your credentials.';
      console.error(error);
    }
  }
}
