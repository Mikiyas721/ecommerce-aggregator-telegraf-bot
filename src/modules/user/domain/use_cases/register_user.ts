import {UserRepo} from "../ports/user_repo";
import {User} from "../entities/user";

export class RegisterUser {
    constructor(private userRepo: UserRepo) {
    }

    execute(user: User) {
        return this.userRepo.registerUser(user)
    }
}
