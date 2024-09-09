import {Invitation} from "../entities/invitation";
import {Either} from "../../../../common/utils/fp/f_p";
import {Failure, Success} from "../../../../common/utils/abstracts";

export interface InvitationRepo {
    registrationInvitation(invitation: Invitation): Promise<Either<Failure, Invitation>>
    fetchInvitation(inviteeId: string): Promise<Either<Failure, Success<Invitation[]>>>
}
