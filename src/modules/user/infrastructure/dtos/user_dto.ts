import {IdDto} from "../../../../common/infrastructure/datasources/dto/dto";
import {User} from "../../domain/entities/user";
import {Option} from "../../../../common/utils/fp/f_p";

export class UserDto extends IdDto<User> {
    constructor(
        id: string | undefined,
        readonly firstName: string,
        readonly lastName: string,
        readonly phoneNumber: string,
        readonly telegramId: string
    ) {
        super(id);
    }

    toDomain(): Option<User> {
        return User.createFromUnvalidated(
            this.id,
            this.firstName,
            this.lastName,
            this.phoneNumber,
            this.telegramId,
        );
    }

    static fromJson(json: any) {
        return new UserDto(
            json.id,
            json.firstName,
            json.lastName,
            json.phoneNumber,
            json.telegramId
        )
    }

    static fromDomain(user: User) {
        return new UserDto(
            user.id,
            user.firstName.value,
            user.lastName.value,
            user.phoneNumber.withCountryCode,
            user.telegramId
        )
    }
}
