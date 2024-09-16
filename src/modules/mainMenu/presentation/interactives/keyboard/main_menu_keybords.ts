import {provider} from "telegraf-721";
import {dependencyKeys} from "../../../../../common/utils/constants";
import {MyLabelKeyboard} from "../../../../../common/utils/telegraf_helper/my_keyboard";
import {MainMenuKeyboardHandlers} from "../../handlers/keyboard/main_menu_keyboard_handlers";

export const injectMainMenuKeyboards = () => {
    provider.registerLazySingleton(
        dependencyKeys.inviteKeyboard,
        () => new MyLabelKeyboard(
            "mainMenu.rms.invite",
            MainMenuKeyboardHandlers.invite
        )
    )
    provider.registerLazySingleton(
        dependencyKeys.myWalletKeyboard,
        () => new MyLabelKeyboard(
            "mainMenu.rms.myWallet",
            MainMenuKeyboardHandlers.myWallet
        )
    )
    provider.registerLazySingleton(
        dependencyKeys.myOrdersKeyboard,
        () => new MyLabelKeyboard(
            "mainMenu.rms.myOrders",
            MainMenuKeyboardHandlers.myOrders
        )
    )
}
