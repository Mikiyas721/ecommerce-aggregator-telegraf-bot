import {WalletRepo} from "../ports/wallet_repo";

export class FetchMyWallet {
    constructor(private walletRepo: WalletRepo) {
    }

    execute(userId: string) {
        return this.walletRepo.fetchMyWallet(userId)
    }
}
