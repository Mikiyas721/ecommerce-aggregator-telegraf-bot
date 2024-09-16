import {provider, MyScene} from "telegraf-721";
import {dependencyKeys, sceneKeys} from "../../../../common/utils/constants";
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
