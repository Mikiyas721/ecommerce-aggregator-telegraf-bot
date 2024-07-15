import {UserRepo} from "../ports/user_repo";

export class UpdateUserTelegramId {
    constructor(private userRepo: UserRepo) {
    }

    execute(id: string, telegramId: string) {
        return this.userRepo.updateUserTelegramId(id, telegramId)
    }
}
