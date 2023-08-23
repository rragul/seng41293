import { Component, Input, Output, EventEmitter, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppService } from '../../../services/app/app.service';
import { MatButtonModule } from '@angular/material/button';
import { Store } from '@ngxs/store';
import { ShowLoading, UpdateUserName } from '../../../state/app/app.actions';
import { MatInputModule } from '@angular/material/input';
import { AppState } from '../../../state/app/app.state';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Firestore, addDoc, collection, collectionData } from '@angular/fire/firestore';
import { MatCardModule } from '@angular/material/card';
interface GRN {
  date: Date;
  customer: {
    name: string;
    phone: string;
  }
}
@Component({
  selector: 'seng41293-admin-grn',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatCardModule, MatInputModule, ReactiveFormsModule, MatDatepickerModule, MatFormFieldModule],
  templateUrl: './admin-grn.component.html',
  styleUrls: ['./admin-grn.component.scss']
})
export class AdminGrnComponent {
  @Input({ required: true }) label!: string;
  @Output() update = new EventEmitter<string>();

  // update userName
  // userName$: Observable<string | undefined>;
  // userNameCtrl = new FormControl();

  // constructor(private store: Store) {
  //   this.userName$ = this.store.select(AppState.userName);
  //   this.userName$.subscribe(userName => {
  //     console.log('UserName:', userName);
  //     this.userNameCtrl.setValue(userName);
  //   });
  // }
  // toggle() {
  //   const currentLoadingState = this.store.selectSnapshot(AppState.loading);
  //   this.store.dispatch(new ShowLoading(!currentLoadingState));
  // }

  // updateName() {
  //   this.store.dispatch(new UpdateUserName(this.userNameCtrl.value));
  // }
  firestore: Firestore = inject(Firestore);
  dateCtrl = new FormControl();
  nameCtrl = new FormControl();
  phoneCtrl = new FormControl()
  customerCtrl = new FormGroup({
    name: this.nameCtrl,
    phone: this.phoneCtrl
  });

  grns$ = collectionData<any>(collection(this.firestore, 'grn'));

  grnFormGroup = new FormGroup({
    date: this.dateCtrl,
    customer: this.customerCtrl
  });

  grnCollection = collection(this.firestore, 'grn');

  async save() {
    const date = new Date(this.dateCtrl.value);
    const toSave = {
      ...this.grnFormGroup.value,
      date,
    }
    await addDoc(this.grnCollection, toSave);
    console.log(this.grnFormGroup.value);
  }

}
