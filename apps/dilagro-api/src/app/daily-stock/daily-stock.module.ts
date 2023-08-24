import { Module } from '@nestjs/common';
import { DailyStockService } from './service/daily-stock.service';
import { DailyStockController } from './controller/daily-stock.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { DailyStock, DailyStockSchema } from './schema/daily-stock.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: DailyStock.name, schema: DailyStockSchema }])],
  controllers: [DailyStockController],
  providers: [DailyStockService],
})
export class DailyStockModule { }
