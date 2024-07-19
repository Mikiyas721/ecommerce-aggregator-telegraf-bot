import {Failure, ValueObject} from "../../../../common/utils/abstracts";
import {Either} from "../../../../common/utils/fp/f_p";

export abstract class DeliveryDateFailure extends Failure {
}

class EmptyDeliveryDateFailure extends DeliveryDateFailure {
    get messageLocaleKey(): string {
        return "order.vos.deliveryDate.empty"
    }
}

class InvalidDeliveryDateFailure extends DeliveryDateFailure {
    get messageLocaleKey(): string {
        return "order.vos.deliveryDate.invalid"
    }
}

class PassedDayDeliveryDateFailure extends DeliveryDateFailure {
    get messageLocaleKey(): string {
        return "order.vos.deliveryDate.passed"
    }
}

const gcDeliveryDateRegExp = /^((0?[1-9])|([1-2]\d)|(3[0-1]))\/((0?[1-9])|(1[0-2]))\/(20\d\d)$/

export class DeliveryDate extends ValueObject {
    private constructor(value: string) {
        super(value);
    }

    static createForGC(deliveryDate: string | undefined): Either<DeliveryDateFailure, DeliveryDate> {
        if (deliveryDate == undefined || deliveryDate == "")
            return Either.left(new EmptyDeliveryDateFailure())
        if (!gcDeliveryDateRegExp.test(deliveryDate))
            return Either.left(new InvalidDeliveryDateFailure())

        const split = deliveryDate.split('/')
        const year = parseInt(split[2])
        const month = parseInt(split[1])
        const day = parseInt(split[0])

        const deliveryDateObject = new Date(Date.UTC(year, month - 1, day, 23, 59, 59))

        if (deliveryDateObject < new Date(Date.now()))
            return Either.left(new PassedDayDeliveryDateFailure())

        return Either.right(new DeliveryDate(deliveryDate))
    }

    static createForISOString(deliveryDate: string | undefined): Either<DeliveryDateFailure, DeliveryDate> {
        if (deliveryDate == undefined || deliveryDate == "")
            return Either.left(new EmptyDeliveryDateFailure())

        const date = new Date(Date.parse(deliveryDate))

        return Either.right(new DeliveryDate(`${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`))
    }

    get isoString() {
        return DeliveryDate.getISOFromSlashed(this.value)
    }

    static getISOFromSlashed(slashedDate: string) {
        const split = slashedDate.split('/')
        const year = parseInt(split[2])
        const month = parseInt(split[1])
        const day = parseInt(split[0])

        const deliveryDateObject = new Date(Date.UTC(year, month - 1, day, 23, 59, 59))

        return deliveryDateObject.toISOString()
    }

}
