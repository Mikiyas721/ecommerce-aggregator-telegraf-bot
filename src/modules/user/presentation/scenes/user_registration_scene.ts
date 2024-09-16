import {provider} from "telegraf-721";
import {dependencyKeys, sceneKeys} from "../../../../common/utils/constants";
import {MyScene} from "../../../../common/utils/telegraf_helper/my_scene";
import {UserRegistrationSceneHandlers} from "../handlers/scene/user_registration_scene_handler";

export const injectUserRegistrationScene = () => {
    provider.registerLazySingleton(
        dependencyKeys.userRegistrationScene,
        () => new MyScene(
            sceneKeys.userRegistration,
            {
                enter: UserRegistrationSceneHandlers.enter,
                steps: [
                    UserRegistrationSceneHandlers.phoneNumber,
                    UserRegistrationSceneHandlers.firstName,
                    UserRegistrationSceneHandlers.lastName,
                    //UserRegistrationSceneHandlers.password,
                ]
            },{
                keyboards: [],
                commands: [
                    provider.get(dependencyKeys.startCommand)
                ]
            }
        )
    )
}
