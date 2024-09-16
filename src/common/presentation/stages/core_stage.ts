import {Scenes} from "telegraf"
import {provider, MyScene} from "telegraf-721";
import {dependencyKeys} from "../../utils/constants";

export const injectMainStage = () => {
    provider.registerSingleton(dependencyKeys.mainStage, new Scenes.Stage(
        [
            provider.get<MyScene>(dependencyKeys.userRegistrationScene),
            provider.get<MyScene>(dependencyKeys.orderScene),
            provider.get<MyScene>(dependencyKeys.feedbackScene),
            provider.get<MyScene>(dependencyKeys.mainMenuScene),
            provider.get<MyScene>(dependencyKeys.myWalletScene),
        ]
    ))
}
