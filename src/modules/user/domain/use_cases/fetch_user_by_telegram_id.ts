import {UserRepo} from "../ports/user_repo";

export class FetchUserByTelegramId {
    constructor(private userRepo: UserRepo) {
    }

    execute(telegramId: string, fetchAllFields: boolean = true) {
        return this.userRepo.fetchUserByTelegramId(telegramId, fetchAllFields)
    }
}
