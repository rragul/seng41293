import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatToolbarModule } from '@angular/material/toolbar';
import { AppState } from './state/app/app.state';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';


@Component({
  standalone: true,
  imports: [ RouterModule, CommonModule, MatToolbarModule, MatProgressBarModule],
  selector: 'seng41293-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'WORLD';
  frameworks = ['Anguler', 'React', 'Vue'];
  userName$: Observable<string | undefined>;
  loading$: Observable<boolean>;

  constructor(private store: Store) {
    this.userName$ = this.store.select(AppState.userName);
    this.loading$ = this.store.select(AppState.loading);
  }
}
