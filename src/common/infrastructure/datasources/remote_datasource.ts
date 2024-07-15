import { RestDatasource } from "./rest_datasource/rest_datasource";

/**
 * Simple helper parent class for API datasources
 * */
export class RemoteDatasource {
  constructor(public myPath: string, public restDatasource: RestDatasource) {
  }
}
