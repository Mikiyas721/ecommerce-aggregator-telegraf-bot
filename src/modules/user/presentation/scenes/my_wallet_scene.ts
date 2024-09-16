import {provider} from "telegraf-721";
import {dependencyKeys, sceneKeys} from "../../../../common/utils/constants";
import {MyScene} from "../../../../common/utils/telegraf_helper/my_scene";
import {MyWalletSceneHandlers} from "../handlers/scene/my_wallet_scene_handlers";

export const injectMyWalletScene = () => {
    provider.registerLazySingleton(
        dependencyKeys.myWalletScene,
        () => new MyScene(
            sceneKeys.myWallet,
            {
                enter: MyWalletSceneHandlers.enter,
                steps: [
                    MyWalletSceneHandlers.chooseAction
                ]
            }, {
                inlineKeyboards: [
                    provider.get(dependencyKeys.walletWithdrawInlineKeyboard),
                    provider.get(dependencyKeys.walletBackInlineKeyboard),
                    provider.get(dependencyKeys.withdrawWithTopUpInlineKeyboard),
                    provider.get(dependencyKeys.withdrawWithTopUpBackInlineKeyboard),
                ],
                commands: [
                    provider.get(dependencyKeys.startCommand)
                ]
            }
        )
    )
}
