import {InvitationRepo} from "../ports/invitation_repo";
import {Invitation} from "../entities/invitation";

export class CreateInvitation {
    constructor(private invitationRepo: InvitationRepo) {

    }

    execute(invitation: Invitation) {
        return this.invitationRepo.registrationInvitation(invitation)
    }
}
