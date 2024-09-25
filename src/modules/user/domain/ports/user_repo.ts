import {Either, Failure} from "telegraf-721";
import {User} from "../entities/user";

export interface UserRepo {
    fetchUserByTelegramId(telegramId: string, fetchAllFields: boolean): Promise<Either<Failure, User[]>>

    fetchUserByPhone(phone: string): Promise<Either<Failure, User[]>>

    registerUser(user: User): Promise<Either<Failure, User>>

    updateUserTelegramId(id: string, telegramId: string): Promise<Either<Failure, User>>
}
