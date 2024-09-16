import {Either, Failure, Success} from "telegraf-721";
import {User} from "../entities/user";

export interface UserRepo {
    fetchUserByTelegramId(telegramId: string, fetchAllFields: boolean)
        : Promise<Either<Failure, Success<User[]>>>

    fetchUserByPhone(phone: string)
        : Promise<Either<Failure, Success<User[]>>>

    registerUser(user: User): Promise<Either<Failure, User>>

    updateUserTelegramId(id: string, telegramId: string): Promise<Either<Failure, User>>
}
