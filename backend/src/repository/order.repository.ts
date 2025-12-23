import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Order, OrderDocument } from 'src/order/order.schema';

@Injectable()
export class OrderRepository {
  constructor(
    @InjectModel(Order.name) private orderModel: Model<OrderDocument>,
  ) {}

  async create(orderData: Partial<Order>): Promise<OrderDocument> {
    const order = new this.orderModel(orderData);
    return order.save();
  }

  async createMany(ordersData: Partial<Order>[]): Promise<OrderDocument[]> {
    return this.orderModel.insertMany(ordersData) as Promise<OrderDocument[]>;
  }

  async findBySession(sessionId: string): Promise<OrderDocument[]> {
    return this.orderModel.find({ session: sessionId }).exec();
  }

  async findByFilmAndSession(
    filmId: string,
    sessionId: string,
  ): Promise<OrderDocument[]> {
    return this.orderModel.find({ film: filmId, session: sessionId }).exec();
  }
}
