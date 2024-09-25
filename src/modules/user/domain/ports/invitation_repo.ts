import {Invitation} from "../entities/invitation";
import {Either, Failure} from "telegraf-721";

export interface InvitationRepo {
    registrationInvitation(invitation: Invitation): Promise<Either<Failure, Invitation>>
    fetchInvitation(inviteeId: string): Promise<Either<Failure, Invitation[]>>
}
