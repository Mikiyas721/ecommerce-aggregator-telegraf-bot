import {OrderRepo} from "../ports/order_repo";
import {Order} from "../entities/order";

export class PlaceOrder {
    constructor(private orderRepo: OrderRepo) {
    }

    execute(order: Order) {
        return this.orderRepo.createOrder(order)
    }
}
