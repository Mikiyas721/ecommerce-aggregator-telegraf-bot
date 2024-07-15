import {Either} from "../../../../common/utils/fp/f_p";
import {Failure, Success, ValuelessSuccess} from "../../../../common/utils/abstracts";
import {User} from "../entities/user";

export interface UserRepo {
    fetchUserByTelegramId(telegramId: string, fetchAllFields: boolean)
        : Promise<Either<Failure, Success<User[]>>>

    fetchUserByPhone(phone: string)
        : Promise<Either<Failure, Success<User[]>>>

    registerUser(user: User): Promise<Either<Failure, ValuelessSuccess>>

    updateUserTelegramId(id: string, telegramId: string): Promise<Either<Failure, User>>
}
