import {Wallet} from "../../domain/entities/wallet";
import {IdDto} from "../../../../common/infrastructure/datasources/dto/dto";

export class WalletDto extends IdDto<Wallet> {
    constructor(
        id: string,
        readonly totalAmountInETC: number,
        readonly totalRewardedAmountInETC: number,
        readonly userId: string,
    ) {
        super(id);
    }

    toDomain(): Wallet {
        return Wallet.create(
            this.id!,
            this.totalAmountInETC,
            this.totalRewardedAmountInETC,
            this.userId
        );
    }

    static fromJson(json: any) {
        return new WalletDto(
            json.id,
            json.totalAmountInETC,
            json.totalRewardedAmountInETC,
            json.userId,
        )
    }
}

