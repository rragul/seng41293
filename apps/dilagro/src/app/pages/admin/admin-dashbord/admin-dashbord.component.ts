import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { MatCardModule } from '@angular/material/card';

interface User {
  name: string;
  email: string;
}

@Component({
  selector: 'seng41293-admin-dashbord',
  standalone: true,
  imports: [CommonModule, MatCardModule],
  templateUrl: './admin-dashbord.component.html',
  styleUrls: ['./admin-dashbord.component.scss']
})
export class AdminDashbordComponent {
  @Input({ required: true }) label!: string;
  @Output() update = new EventEmitter<string>();

  users$: Observable<User[]>;

  constructor(private http: HttpClient) {
    this.users$ = this.http
      .get<User[]>('https://jsonplaceholder.typicode.com/users');
  }

}
