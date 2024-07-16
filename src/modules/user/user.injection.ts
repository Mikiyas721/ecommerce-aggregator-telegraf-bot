import {provider} from "../../injection";
import {dependencyKeys} from "../../common/utils/constants";
import {UserRemoteDatasource} from "./infrastructure/datasources/user_remote_datasource";
import {UserRepoImpl} from "./infrastructure/repos/user_repo_impl";
import {FetchUserByTelegramId} from "./domain/use_cases/fetch_user_by_telegram_id";
import {injectUserRegistrationScene} from "./presentation/scenes/user_registration_scene";
import {injectUserRegistrationKeyboards} from "./presentation/interactives/keyboards/user_registration_keyboards";
import {RegisterUser} from "./domain/use_cases/register_user";
import {UpdateUserTelegramId} from "./domain/use_cases/update_user_telegram_id";
import {FetchUserByPhoneNumber} from "./domain/use_cases/fetch_user_by_phone_number";
import {FetchProductOrBundleById} from "./domain/use_cases/fetch_product_or_bundle_by_id";

const injectPresentation = () => {
    injectUserRegistrationKeyboards()
    injectUserRegistrationScene()
}


const injectInfrastructure = () => {
    provider.registerLazySingleton(
        dependencyKeys.userDatasource,
        () => new UserRemoteDatasource(
            provider.get(dependencyKeys.restDatasource)
        )
    )
    provider.registerLazySingleton(
        dependencyKeys.userRepo,
        () => new UserRepoImpl(
            provider.get(dependencyKeys.userDatasource)
        )
    )
}

const injectDomain = () => {
    provider.registerLazySingleton(
        dependencyKeys.fetchUserByTelegramId,
        () => new FetchUserByTelegramId(
            provider.get(dependencyKeys.userRepo)
        )
    )
    provider.registerLazySingleton(
        dependencyKeys.fetchUserByPhone,
        () => new FetchUserByPhoneNumber(
            provider.get(dependencyKeys.userRepo)
        )
    )
    provider.registerLazySingleton(
        dependencyKeys.registerUser,
        () => new RegisterUser(
            provider.get(dependencyKeys.userRepo)
        )
    )
    provider.registerLazySingleton(
        dependencyKeys.updateUserTelegramId,
        () => new UpdateUserTelegramId(
            provider.get(dependencyKeys.userRepo)
        )
    )
    provider.registerLazySingleton(
        dependencyKeys.fetchBundleOrProduct,
        () => new FetchProductOrBundleById(
            provider.get(dependencyKeys.productRepo)
        )
    )
}

export const injectUserModule = () => {
    injectPresentation()
    injectInfrastructure()
    injectDomain()
}
