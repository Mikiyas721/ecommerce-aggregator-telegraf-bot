import {Either, Failure} from "telegraf-721";
import {Wallet} from "../entities/wallet";

export interface WalletRepo {
    fetchMyWallet(userId: string): Promise<Either<Failure, Wallet>>

    withdrawReward(amount: number, telegramId: string): Promise<Either<Failure, {}>>
}
