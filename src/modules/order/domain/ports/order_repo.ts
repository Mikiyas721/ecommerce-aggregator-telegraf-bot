import {Order} from "../entities/order";
import {Either} from "../../../../common/utils/fp/f_p";
import {Failure} from "../../../../common/utils/abstracts";

export interface OrderRepo {
    createOrder(order: Order): Promise<Either<Failure, Order>>
}
