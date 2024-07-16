import {injectOrderScenes} from "./presentation/scenes/order_scenes";
import {injectOrderKeyboards} from "./presentation/interactives/keyboards/order_keyboards";
import {provider} from "../../injection";
import {dependencyKeys} from "../../common/utils/constants";
import {OrderRemoteDatasource} from "./infrastructure/datasources/order_datasource";
import {OrderRepoImpl} from "./infrastructure/repos/order_repo_impl";
import {PlaceOrder} from "./domain/use_cases/place_order";

const injectPresentation = () => {
    injectOrderKeyboards()
    injectOrderScenes()
}

const injectInfrastructure = () => {
    provider.registerLazySingleton(
        dependencyKeys.orderDatasource,
        () => new OrderRemoteDatasource(
            provider.get(dependencyKeys.restDatasource)
        )
    )
    provider.registerLazySingleton(
        dependencyKeys.orderRepo,
        () => new OrderRepoImpl(
            provider.get(dependencyKeys.orderDatasource)
        )
    )

}

const injectDomain = () => {
    provider.registerLazySingleton(
        dependencyKeys.placeOrder,
        () => new PlaceOrder(
            provider.get(dependencyKeys.orderRepo)
        )
    )
}

export const injectOrderModule = () => {
    injectPresentation()
    injectInfrastructure()
    injectDomain()
}
