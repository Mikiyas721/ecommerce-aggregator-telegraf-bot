import {OrderRepo} from "../../domain/ports/order_repo";
import {OrderRemoteDatasource} from "../datasources/order_datasource";
import {Order} from "../../domain/entities/order";
import {Either, Failure, SimpleFailure} from "telegraf-721";
import {OrderDto} from "../dtos/order_dto";

export class OrderRepoImpl implements OrderRepo {
    constructor(private orderDatasource: OrderRemoteDatasource) {
    }

    async createOrder(order: Order): Promise<Either<Failure, Order>> {
        const orderResponse = await this.orderDatasource.restDatasource.post({
            url: `${this.orderDatasource.myPath}`,
            data: OrderDto.fromDomain(order).toJson()
        });

        return orderResponse.fold(
            l => Either.left(l),
            r => OrderDto.fromJson(r.value).toDomain().fold(
                () => Either.left(new SimpleFailure("Unable to map dto to domain")),
                s => Either.right(s))
        );
    }
}
