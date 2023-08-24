import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Store } from '@ngxs/store';
import { Login, UpdateUser } from '../../state/app/app.actions';
import { catchError, from, tap } from 'rxjs';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'seng41293-login',
  standalone: true,
  imports: [CommonModule, MatInputModule, MatButtonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  error = '';
  emailCtrl = new FormControl("", [Validators.required, Validators.email]);
  passwordCtrl = new FormControl("", [Validators.required, Validators.minLength(6)]);
  formGroup = new FormGroup({
    email: this.emailCtrl,
    password: this.passwordCtrl,
  });

  constructor(
    private router: Router,
    private angularFireAuth: AngularFireAuth,
    private store: Store,
    private authService: AuthService,
  ) { }

  // async onLogin() {
  //   const email = this.formGroup.get('email')?.value as string;
  //   const password = this.formGroup.get('password')?.value as string;
  //   const authPromis = this.angularFireAuth.signInWithEmailAndPassword(email, password);

  //   from(authPromis)
  //     .pipe(
  //       tap((c) => {
  //         if (c.user) {
  //           this.store.dispatch(new UpdateUser(c.user));
  //         }
  //       }),
  //       tap(() => this.router.navigate(['/admin'])),
  //       catchError((error) => {
  //         this.error = 'Login failed. Please check your credentials.';
  //         console.error(error);
  //         return error;
  //       }
  //       )
  //     )
  //     .subscribe();

  // try {
  //   await this.angularFireAuth.signInWithEmailAndPassword(email, password)
  //     .then((c) => {
  //       if (c.user) {
  //         this.store.dispatch(new UpdateUser(c.user));
  //       }
  //       this.router.navigate(['/admin']);
  //     });
  // } catch (error) {
  //   // Handle login error
  //   this.error = 'Login failed. Please check your credentials.';
  //   console.error(error);
  // }
  // }
  onLogin() {
    const value = this.formGroup.value;
    const success = this.store.dispatch(new Login(value.email, value.password));
    success.subscribe((c) => {
      if (c.user) {
        this.store.dispatch(new UpdateUser(c.user));
      }
      this.router.navigate(['/admin']);
    }, (error) => {
      this.error = 'Login failed. Please check your credentials.';
      console.error(error);
    }
    );
  }
}
