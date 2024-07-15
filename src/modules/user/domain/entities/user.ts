import Entity from "../../../../common/domain/entities/entity";
import {PhoneNumber} from "../value_objects/phoneNumber";
import {Option} from "../../../../common/utils/fp/f_p";
import {Name} from "../value_objects/name";

export class User extends Entity {
    private constructor(
        id: string | undefined,
        readonly firstName: Name,
        readonly lastName: Name,
        readonly phone: PhoneNumber,
        readonly telegramId: string
    ) {
        super(id);
    }

    static createFromUnvalidated(
        id: string | undefined,
        firstName: string,
        lastName: string,
        phone: string,
        telegramId: string
    ): Option<User> {
        if (!id) return Option.none()

        const firstNameObject = Name.createForFirstName(firstName)
        if (firstNameObject.isLeft) return Option.none()

        const lastNameObject = Name.createForLastName(lastName)
        if (lastNameObject.isLeft) return Option.none()

        const phoneNumberObject = PhoneNumber.createForEthiopian(phone)
        if (phoneNumberObject.isLeft) return Option.none()

        return Option.some(new User(
            id,
            firstNameObject.getRight(),
            lastNameObject.getRight(),
            phoneNumberObject.getRight(),
            telegramId
        ))
    }

    static createFromValidated(
        firstName: string,
        lastName: string,
        phone: string,
        telegramId: string
    ): User {
        const firstNameObject = Name.createForFirstName(firstName)
        const lastNameObject = Name.createForLastName(lastName)
        const phoneNumberObject = PhoneNumber.createForEthiopian(phone)

        return new User(
            undefined,
            firstNameObject.getRight(),
            lastNameObject.getRight(),
            phoneNumberObject.getRight(),
            telegramId
        )
    }
}
