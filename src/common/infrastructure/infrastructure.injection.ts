import {provider} from "../../injection";
import {dependencyKeys} from "../utils/constants";
import {AxiosDatasource} from "./datasources/rest_datasource";

export const injectInfrastructure = () => {
    provider.registerSingleton(
        dependencyKeys.restDatasource,
        AxiosDatasource.getInstance(provider.get(dependencyKeys.config))
    )
}
