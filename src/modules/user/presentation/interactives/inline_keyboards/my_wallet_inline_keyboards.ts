import {provider} from "../../../../../injection";
import {dependencyKeys} from "../../../../../common/utils/constants";
import {MyCoreCallbackInlineKeyboard} from "../../../../../common/utils/telegraf_helper/my_inline_keyboard";
import {MyWalletInlineKeyboardHandlers} from "../../handlers/inline_keyboard/my_wallet_inline_keyboard_handlers";

export const injectMyWalletInlineKeyboards = () => {
    provider.registerLazySingleton(
        dependencyKeys.walletWithdrawInlineKeyboard,
        () => new MyCoreCallbackInlineKeyboard(
            "user.rms.withdraw",
            "walletWithdraw",
            MyWalletInlineKeyboardHandlers.withdraw
        )
    )
    provider.registerLazySingleton(
        dependencyKeys.walletBackInlineKeyboard,
        () => new MyCoreCallbackInlineKeyboard(
            "common.rms.back",
            "walletBack",
            MyWalletInlineKeyboardHandlers.walletBack
        )
    )
    provider.registerLazySingleton(
        dependencyKeys.withdrawWithTopUpInlineKeyboard,
        () => new MyCoreCallbackInlineKeyboard(
            "NOT_DEFINED",
            "withdrawWithTopUp",
            MyWalletInlineKeyboardHandlers.withdrawWithTopUp,
            '[0-9]+'
        )
    )
    provider.registerLazySingleton(
        dependencyKeys.withdrawWithTopUpBackInlineKeyboard,
        () => new MyCoreCallbackInlineKeyboard(
            "common.rms.back",
            "withdrawWithTopUpBack",
            MyWalletInlineKeyboardHandlers.withdrawWithTopUpBack
        )
    )
}
