import {Scenes} from "telegraf"
import {provider} from "../../../injection";
import {dependencyKeys} from "../../utils/constants";
import {MyScene} from "../../utils/telegraf_helper/my_scene";

export const injectMainStage = () => {
    provider.registerSingleton(dependencyKeys.mainStage, new Scenes.Stage(
        [
            provider.get<MyScene>(dependencyKeys.userRegistrationScene),
            provider.get<MyScene>(dependencyKeys.orderScene),
            provider.get<MyScene>(dependencyKeys.feedbackScene)
        ]
    ))
}
