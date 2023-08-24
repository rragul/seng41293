import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DailyStockService } from '../../../services/daily-stock/daily-stock.service';
import { Observable } from 'rxjs';
import { IDailyStock } from '@seng41293/model/model';

@Component({
  selector: 'seng41293-admin-daily',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-daily.component.html',
  styleUrls: ['./admin-daily.component.scss']
})
export class AdminDailyComponent {

  dailyStock$: Observable<IDailyStock[]>;
  constructor(private dailyStockService: DailyStockService) {
    this.dailyStock$ = dailyStockService.findAll();
  }
}
