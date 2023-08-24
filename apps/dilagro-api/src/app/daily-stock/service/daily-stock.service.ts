import { Injectable } from '@nestjs/common';
import { CreateDailyStockDto } from '../dto/create-daily-stock.dto';
import { UpdateDailyStockDto } from '../dto/update-daily-stock.dto';
import { DailyStock, DailyStockCollection } from '../schema/daily-stock.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class DailyStockService {
  constructor(@InjectModel(DailyStock.name) private dailyStockModel: Model<DailyStock>) { }

  create(_createDailyStockDto: CreateDailyStockDto) {
    return 'This action adds a new dailyStock';
  }

  findAll(): Promise<DailyStockCollection[]> {
    return this.dailyStockModel.find().exec();
  }

  findOne(id: number) {
    return `This action returns a #${id} dailyStock`;
  }

  update(id: number, updateDailyStockDto: UpdateDailyStockDto) {
    return `This action updates a #${id} dailyStock`;
  }

  remove(id: number) {
    return `This action removes a #${id} dailyStock`;
  }
}
