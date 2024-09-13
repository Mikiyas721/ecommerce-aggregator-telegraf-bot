import {WalletRepo} from "../../domain/ports/wallet_repo";
import {WalletRemoteDatasource} from "../datasources/wallet_remote_datasource";
import {Either} from "../../../../common/utils/fp/f_p";
import {Failure, ValuelessSuccess} from "../../../../common/utils/abstracts";
import {Wallet} from "../../domain/entities/wallet";
import {WalletDto} from "../dtos/wallet_dto";

export class WalletRepoImpl implements WalletRepo {
    constructor(private walletDatasource: WalletRemoteDatasource) {
    }

    async fetchMyWallet(userId: string): Promise<Either<Failure, Wallet>> {
        const workStatusesResponse = await this.walletDatasource.restDatasource.get({
            url: `${this.walletDatasource.myPath}/findOrCreate`,
            params: {filter: JSON.stringify({where: {userId}})}
        });
        return workStatusesResponse.fold(
            l => Either.left(l),
            r => Either.right(WalletDto.fromJson(r.value?.at(0)).toDomain())
        );
    }

    async withdrawReward(amount: number, telegramId: string): Promise<Either<Failure, ValuelessSuccess>> {
        const withdrawResponse = await this.walletDatasource.restDatasource.post({
            url: `${this.walletDatasource.myPath}/withdraw`,
            data: {
                amount,
                telegramId
            }
        });
        return withdrawResponse.fold(
            l => Either.left(l),
            _ => Either.right(new ValuelessSuccess())
        );
    }

}
