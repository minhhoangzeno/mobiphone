import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Document } from 'mongoose';
import { Category } from 'src/category/schemas/category.schemas';

export type ProductDocument = Product & Document;

@Schema()
export class Product {
    @Prop()
    id: mongoose.Schema.Types.ObjectId;

    @Prop({ required: true })
    title: String;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Category' })
    category: Category;

    @Prop({ required: true })
    price: Number;

    @Prop({ required: true })
    content: String;

    @Prop({ required: true })
    animate: String;

    @Prop({ required: true })
    photoURL: String;

    @Prop({ default: new Date() })
    createdAt: Date;
}

export const ProductSchema = SchemaFactory.createForClass(Product);