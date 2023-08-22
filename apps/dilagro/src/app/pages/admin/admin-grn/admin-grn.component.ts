import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppService } from '../../../services/app/app.service';
import { MatButtonModule } from '@angular/material/button';
import { Store } from '@ngxs/store';
import { ShowLoading, UpdateUserName } from '../../../state/app/app.actions';
import { MatInputModule } from '@angular/material/input';
import { AppState } from '../../../state/app/app.state';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'seng41293-admin-grn',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatInputModule, ReactiveFormsModule],
  templateUrl: './admin-grn.component.html',
  styleUrls: ['./admin-grn.component.scss']
})
export class AdminGrnComponent {
  @Input({ required: true }) label!: string;
  @Output() update = new EventEmitter<string>();

  userName$: Observable<string | undefined>;
  userNameCtrl = new FormControl();

  constructor(private store: Store) {
    this.userName$ = this.store.select(AppState.userName);
    this.userName$.subscribe(userName => {
      console.log('UserName:', userName);
      this.userNameCtrl.setValue(userName);
    });
  }
  toggle() {
    const currentLoadingState = this.store.selectSnapshot(AppState.loading);
    this.store.dispatch(new ShowLoading(!currentLoadingState));
  }

  updateName() {
    this.store.dispatch(new UpdateUserName(this.userNameCtrl.value));
  }
}
