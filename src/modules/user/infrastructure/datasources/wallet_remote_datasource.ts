import {RemoteDatasource} from "../../../../common/infrastructure/datasources/remote_datasource";
import {RestDatasource} from "../../../../common/infrastructure/datasources/rest_datasource/rest_datasource";

export class WalletRemoteDatasource extends RemoteDatasource {
    constructor(restDatasource: RestDatasource) {
        super("/wallets", restDatasource);
    }
}
