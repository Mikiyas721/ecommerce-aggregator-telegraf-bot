import {RemoteDatasource} from "../../../../common/infrastructure/datasources/remote_datasource";
import {RestDatasource} from "../../../../common/infrastructure/datasources/rest_datasource/rest_datasource";

export class InvitationRemoteDatasource extends RemoteDatasource {
    constructor(restDatasource: RestDatasource) {
        super("/invitations", restDatasource);
    }
}
