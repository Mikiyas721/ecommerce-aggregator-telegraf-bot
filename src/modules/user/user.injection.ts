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
import {FeedbackRemoteDatasource} from "./infrastructure/datasources/feedback_remote_datasource";
import {FeedbackRepoImpl} from "./infrastructure/repos/feedback_repo_impl";
import {AddFeedback} from "./domain/use_cases/add_feedback";
import {injectFeedbackScene} from "./presentation/scenes/feedback_scene";
import {injectFeedbackKeyboard} from "./presentation/interactives/keyboards/feedback_keyboards";
import {injectFeedbackInlineKeyboards} from "./presentation/interactives/inline_keyboards/feedback_inline_keyboards";
import {CreateInvitation} from "./domain/use_cases/create_invitation";
import {InvitationRemoteDatasource} from "./infrastructure/datasources/invitation_remote_datasource";
import {InvitationRepoImpl} from "./infrastructure/repos/invitation_repo_impl";

const injectPresentation = () => {
    injectFeedbackKeyboard()
    injectFeedbackInlineKeyboards()
    injectUserRegistrationKeyboards()
    injectUserRegistrationScene()
    injectFeedbackScene()
}


const injectInfrastructure = () => {
    provider.registerLazySingleton(
        dependencyKeys.userDatasource,
        () => new UserRemoteDatasource(
            provider.get(dependencyKeys.restDatasource)
        )
    )
    provider.registerLazySingleton(
        dependencyKeys.feedbackDatasource,
        () => new FeedbackRemoteDatasource(
            provider.get(dependencyKeys.restDatasource)
        )
    )
    provider.registerLazySingleton(
        dependencyKeys.invitationDatasource,
        () => new InvitationRemoteDatasource(
            provider.get(dependencyKeys.restDatasource)
        )
    )
    provider.registerLazySingleton(
        dependencyKeys.userRepo,
        () => new UserRepoImpl(
            provider.get(dependencyKeys.userDatasource)
        )
    )
    provider.registerLazySingleton(
        dependencyKeys.feedbackRepo,
        () => new FeedbackRepoImpl(
            provider.get(dependencyKeys.feedbackDatasource)
        )
    )
    provider.registerLazySingleton(
        dependencyKeys.invitationRepo,
        () => new InvitationRepoImpl(
            provider.get(dependencyKeys.invitationDatasource)
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
        dependencyKeys.addFeedback,
        () => new AddFeedback(
            provider.get(dependencyKeys.feedbackRepo)
        )
    )
    provider.registerLazySingleton(
        dependencyKeys.fetchBundleOrProduct,
        () => new FetchProductOrBundleById(
            provider.get(dependencyKeys.productRepo)
        )
    )
    provider.registerLazySingleton(
        dependencyKeys.createInvitation,
        () => new CreateInvitation(
            provider.get(dependencyKeys.invitationRepo)
        )
    )
}

export const injectUserModule = () => {
    injectPresentation()
    injectInfrastructure()
    injectDomain()
}
