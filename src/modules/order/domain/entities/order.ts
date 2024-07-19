import Entity from "../../../../common/domain/entities/entity";
import {DeliveryDate} from "../value_objects/delivery_date";
import {DeliveryAddress} from "../value_objects/delivery_address";
import {Note} from "../value_objects/note";
import {Option} from "../../../../common/utils/fp/f_p";

export class Order extends Entity {
    private constructor(
        id: string | undefined,
        readonly deliveryDate: DeliveryDate,
        readonly deliveryAddress: DeliveryAddress,
        readonly note: Note | undefined,
        readonly userId: string,
        readonly productId: string
    ) {
        super(id);
    }

    static createFromUnvalidated(
        id: string | undefined,
        deliveryDate: string,
        deliveryAddress: string,
        note: string | undefined,
        userId: string,
        productId: string,
    ): Option<Order> {
        if (!id) return Option.none()

        const deliveryDateObject = DeliveryDate.createForISOString(deliveryDate)
        if (deliveryDateObject.isLeft) return Option.none()

        const deliveryAddressObject = DeliveryAddress.create(deliveryAddress)
        if (deliveryAddressObject.isLeft) return Option.none()

        const noteObject = note == undefined ? undefined : Note.create(note)
        if (note && noteObject?.isLeft) return Option.none()

        return Option.some(
            new Order(
                id,
                deliveryDateObject.getRight(),
                deliveryAddressObject.getRight(),
                noteObject?.getRight(),
                userId,
                productId
            ))
    }

    static createFromValidated(
        deliveryDate: string,
        deliveryAddress: string,
        note: string | undefined,
        userId: string,
        productId: string,
    ): Order {
        const deliveryDateObject = DeliveryDate.createForGC(deliveryDate)
        const deliveryAddressObject = DeliveryAddress.create(deliveryAddress)
        const noteObject = note == undefined ? undefined : Note.create(note)

        return new Order(
            undefined,
            deliveryDateObject.getRight(),
            deliveryAddressObject.getRight(),
            noteObject?.getRight(),
            userId,
            productId
        )
    }
}
