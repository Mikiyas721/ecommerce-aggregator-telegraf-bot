import {UserRepo} from "../ports/user_repo";

export class FetchUserByPhoneNumber{
    constructor(private userRepo: UserRepo) {
    }

    execute(phone: string) {
        return this.userRepo.fetchUserByPhone(phone)
    }
}
