import { Module } from '@nestjs/common';
import { DailyStockModule } from './daily-stock/daily-stock.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { getEnvPath } from './app.helper';
import { AuthModule } from './auth/auth.module';


const envFilePath: string = getEnvPath(`${__dirname}/environments`);
@Module({
  imports: [
    DailyStockModule,
    AuthModule,
    ConfigModule.forRoot({ envFilePath }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get('MONGO_URL'),
      }),
    }),

  ],
})
export class AppModule { }
