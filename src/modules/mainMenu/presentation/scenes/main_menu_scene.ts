import {provider} from "telegraf-721";
import {MyScene} from "../../../../common/utils/telegraf_helper/my_scene";
import {dependencyKeys, sceneKeys} from "../../../../common/utils/constants";
import {MainMenuSceneHandlers} from "../handlers/scene/main_menu_scene_handlers";
import {MyCommand} from "../../../../common/utils/telegraf_helper/my_command";

export const injectMainMenuScenes = () => {
    provider.registerSingleton(
        dependencyKeys.mainMenuScene,
        new MyScene(
            sceneKeys.mainMenu,
            {
                enter: MainMenuSceneHandlers.enter,
                steps: [
                    MainMenuSceneHandlers.mainMenu
                ]
            }, {
                keyboards: [
                    provider.get(dependencyKeys.inviteKeyboard),
                    provider.get(dependencyKeys.myWalletKeyboard),
                    provider.get(dependencyKeys.myOrdersKeyboard),
                ],
                inlineKeyboards: [],
                commands: [
                    provider.get<MyCommand>(dependencyKeys.startCommand)
                ]
            }
        )
    )
}
