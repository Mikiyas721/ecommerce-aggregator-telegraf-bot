import {Either} from "../../../../common/utils/fp/f_p";
import {Failure, ValuelessSuccess} from "../../../../common/utils/abstracts";
import {Wallet} from "../entities/wallet";

export interface WalletRepo {
    fetchMyWallet(userId: string): Promise<Either<Failure, Wallet>>

    withdrawReward(amount: number, telegramId: string): Promise<Either<Failure, ValuelessSuccess>>
}
