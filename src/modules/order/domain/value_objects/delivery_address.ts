import {Failure, ValueObject} from "../../../../common/utils/abstracts";
import {Either} from "../../../../common/utils/fp/f_p";

export abstract class DeliveryAddressFailure extends Failure {
}

class EmptyDeliveryAddressFailure extends DeliveryAddressFailure {
    get messageLocaleKey(): string {
        return "order.vos.deliveryAddress.empty";
    }
}

class ShortDeliveryAddressFailure extends DeliveryAddressFailure {
    get messageLocaleKey(): string {
        return "order.vos.deliveryAddress.short";
    }
}

export class DeliveryAddress extends ValueObject {
    private constructor(value: string) {
        super(value);
    }

    static create(deliveryAddress: string | undefined): Either<DeliveryAddressFailure, DeliveryAddress> {
        if (deliveryAddress == undefined || deliveryAddress == "")
            return Either.left(new EmptyDeliveryAddressFailure())

        if (deliveryAddress.length < 3)
            return Either.left(new ShortDeliveryAddressFailure())

        return Either.right(new DeliveryAddress(deliveryAddress))
    }
}
