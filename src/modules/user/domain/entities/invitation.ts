import {Entity} from "telegraf-721"

export class Invitation extends Entity {
    private constructor(
        id: string | undefined,
        readonly invitorId: string,
        readonly inviteeId: string,
        readonly rewardInETC?: number,
        readonly inviteeHasJoinedChannel?: boolean
    ) {
        super(id);
    }

    static create(
        id: string | undefined,
        invitorId: string,
        inviteeId: string,
        rewardInETC?: number,
        inviteeHasJoinedChannel?: boolean
    ) {
        return new Invitation(
            id,
            invitorId,
            inviteeId,
            rewardInETC,
            inviteeHasJoinedChannel
        )
    }
}
