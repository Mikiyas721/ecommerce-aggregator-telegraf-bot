import {Invitation} from "../../domain/entities/invitation";
import {IdDto} from "../../../../common/infrastructure/datasources/dto/dto";

export class InvitationDto extends IdDto<Invitation>{
    private constructor(
        id: string | undefined,
        readonly invitorId: string,
        readonly inviteeId: string,
        readonly rewardInETC?: number,
        readonly inviteeHasJoinedChannel?: boolean
    ) {
        super(id);
    }

    toDomain(): Invitation {
        return Invitation.create(
            this.id,
            this.invitorId,
            this.inviteeId,
            this.rewardInETC,
            this.inviteeHasJoinedChannel,
        );
    }

    static fromJson(json:any){
        return new InvitationDto(
            json.id,
            json.invitorId,
            json.inviteeId,
            json.rewardInETC,
            json.inviteeHasJoinedChannel,
        )
    }

    static fromDomain(invitation: Invitation){
        return new InvitationDto(
            invitation.id,
            invitation.invitorId,
            invitation.inviteeId,
            invitation.rewardInETC,
            invitation.inviteeHasJoinedChannel,
        )
    }
}
