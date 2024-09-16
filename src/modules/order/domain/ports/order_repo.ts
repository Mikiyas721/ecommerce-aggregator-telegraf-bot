import {Order} from "../entities/order";
import {Either, Failure} from "telegraf-721";

export interface OrderRepo {
    createOrder(order: Order): Promise<Either<Failure, Order>>
}
