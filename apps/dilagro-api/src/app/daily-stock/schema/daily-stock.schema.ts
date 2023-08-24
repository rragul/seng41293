import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { IDailyStock } from "@seng41293/model/model";
import { HydratedDocument } from "mongoose";

@Schema()
export class DailyStock implements IDailyStock {
    @Prop()
    date: Date;
    @Prop()
    amount: number;
}

export type DailyStockCollection = HydratedDocument<DailyStock>;
export const DailyStockSchema = SchemaFactory.createForClass(DailyStock);
