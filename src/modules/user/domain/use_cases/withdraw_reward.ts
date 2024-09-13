import {WalletRepo} from "../ports/wallet_repo";

export class WithdrawReward {
    constructor(private walletRepo: WalletRepo) {
    }

    execute(amount: number, telegramId: string) {
        return this.walletRepo.withdrawReward(amount, telegramId)
    }
}
