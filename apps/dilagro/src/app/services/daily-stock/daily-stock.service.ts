import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DailyStockService {

  constructor(private httpClient: HttpClient) { }

  findAll() {
    return this.httpClient.get('http://localhost:3000/api/daily-stock');
  }
}
