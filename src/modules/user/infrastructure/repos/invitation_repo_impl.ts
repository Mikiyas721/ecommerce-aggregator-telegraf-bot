import {InvitationRepo} from "../../domain/ports/invitation_repo";
import {InvitationRemoteDatasource} from "../datasources/invitation_remote_datasource";
import {Invitation} from "../../domain/entities/invitation";
import {InvitationDto} from "../dtos/invitation_dto";
import {Either} from "../../../../common/utils/fp/f_p";
import {Failure, Success} from "../../../../common/utils/abstracts";

export class InvitationRepoImpl implements InvitationRepo {
    constructor(private remoteDatasource: InvitationRemoteDatasource) {
    }

    async registrationInvitation(invitation: Invitation): Promise<Either<Failure, Invitation>> {
        const invitationResponse = await this.remoteDatasource.restDatasource.post({
            url: this.remoteDatasource.myPath,
            data: InvitationDto.fromDomain(invitation).toJson()
        });
        return invitationResponse.fold(
            l => Either.left(l),
            r => Either.right(InvitationDto.fromJson(r.value).toDomain())
        )
    }

    async fetchInvitation(inviteeId: string): Promise<Either<Failure, Success<Invitation[]>>> {
        const invitationResponse = await this.remoteDatasource.restDatasource.get({
            url: this.remoteDatasource.myPath,
            params: {
                filter: JSON.stringify({
                    where: {inviteeId}
                })
            }
        });
        return invitationResponse.fold(
            l => Either.left(l),
            r => Either.right(new Success(
                r.value.map((invitation:any) => InvitationDto.fromJson(invitation).toDomain())
            ))
        )
    }

}
