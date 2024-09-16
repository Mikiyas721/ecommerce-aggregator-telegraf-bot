import {IdDto} from "../../../../common/infrastructure/datasources/dto/dto";
import {Option} from "telegraf-721";
import {Order} from "../../domain/entities/order";

export class OrderDto extends IdDto<Order> {
    constructor(
        id: string | undefined,
        readonly deliveryDate: string,
        readonly deliveryAddress: string,
        readonly note: string | undefined,
        readonly userId: string,
        readonly productId: string
    ) {
        super(id);
    }

    toDomain(): Option<Order> {
        return Order.createFromUnvalidated(
            this.id,
            this.deliveryDate,
            this.deliveryAddress,
            this.note,
            this.userId,
            this.productId,
        );
    }

    static fromJson(json: any) {
        return new OrderDto(
            json.id,
            json.deliveryDate,
            json.deliveryAddress,
            json.note,
            json.userId,
            json.productId
        )
    }

    static fromDomain(order: Order) {
        return new OrderDto(
            order.id,
            order.deliveryDate.isoString,
            order.deliveryAddress.value,
            order.note?.value,
            order.userId,
            order.productId
        )
    }
}
