import {Failure, ValueObject} from "../../../../common/utils/abstracts";
import {Either} from "../../../../common/utils/fp/f_p";

export abstract class PhoneNumberFailure extends Failure {
}

class EmptyPhoneNumberFailure extends PhoneNumberFailure {
    get messageLocaleKey(): string {
        return "user.vos.phoneNumber.empty";
    }
}

class InvalidEthiopianPhoneNumberFailure extends PhoneNumberFailure {
    get messageLocaleKey(): string {
        return "user.vos.phoneNumber.invalid";
    }
}

const ethiopianMobilePhoneRegExp = /^(((\+?2510?9|09|9)([0-9]{8}))|((\+?2510?7|07|7)([0-9]{8})))$/
const ethiopianOfficePhoneRegExp = /^((\+?2510?11[1-9]|011[1-9])([0-9]{6}))$/

export class PhoneNumber extends ValueObject {
    private constructor(value: string) {
        super(value);
    }

    static createForEthiopianMobilePhone(phoneNumber: string|undefined): Either<PhoneNumberFailure, PhoneNumber> {
        if (phoneNumber == undefined || phoneNumber == "") return Either.left(new EmptyPhoneNumberFailure())
        if (!ethiopianMobilePhoneRegExp.test(phoneNumber)) return Either.left(new InvalidEthiopianPhoneNumberFailure())
        return Either.right(new PhoneNumber(`+251${phoneNumber.slice(-9)}`))
    }

    static createForEthiopianOfficePhone(phoneNumber: string): Either<PhoneNumberFailure, PhoneNumber> {
        if (phoneNumber == undefined || phoneNumber == "") return Either.left(new EmptyPhoneNumberFailure())
        if (!ethiopianOfficePhoneRegExp.test(phoneNumber)) return Either.left(new InvalidEthiopianPhoneNumberFailure())
        return Either.right(new PhoneNumber(phoneNumber))
    }

    static createForEthiopian(phoneNumber: string|undefined): Either<PhoneNumberFailure, PhoneNumber> {
        if (phoneNumber == undefined || phoneNumber == "") return Either.left(new EmptyPhoneNumberFailure())
        if (!ethiopianMobilePhoneRegExp.test(phoneNumber) &&
            !ethiopianOfficePhoneRegExp.test(phoneNumber)
        ) return Either.left(new InvalidEthiopianPhoneNumberFailure())
        return Either.right(new PhoneNumber(`+251${phoneNumber.slice(-9)}`))
    }

    get withCountryCode() {
        return `+251${this.value.substring(this.value.length - 9)}`
    }

    get with09Format() {
        return `0${this.value.substring(this.value.length - 9)}`
    }

    get core() {
        return this.value.substring(this.value.length - 9)
    }
}
