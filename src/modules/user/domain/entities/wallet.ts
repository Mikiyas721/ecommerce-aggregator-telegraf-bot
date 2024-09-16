import Entity from "../../../../common/domain/entities/entity";

export class Wallet extends Entity {
    private constructor(
        id: string,
        readonly totalAmountInETC: number,
        readonly totalRewardedAmountInETC: number,
        readonly userId: string,
    ) {
        super(id);
    }

    static create(
        id: string,
        totalAmountInETC: number,
        totalRewardedAmountInETC: number,
        userId: string,
    ) {
        return new Wallet(
            id,
            totalAmountInETC,
            totalRewardedAmountInETC,
            userId
        )
    }
}

