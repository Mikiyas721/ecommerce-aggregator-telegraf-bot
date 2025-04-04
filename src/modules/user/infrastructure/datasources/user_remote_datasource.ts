import {RemoteDatasource} from "../../../../common/infrastructure/datasources/remote_datasource";
import {RestDatasource} from "../../../../common/infrastructure/datasources/rest_datasource/rest_datasource";

export class UserRemoteDatasource extends RemoteDatasource {
    constructor(restDatasource: RestDatasource) {
        super("/users", restDatasource);
    }
}
