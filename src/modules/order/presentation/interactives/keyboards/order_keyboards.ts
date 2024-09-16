import {provider, MyLabelKeyboard} from "telegraf-721";
import {dependencyKeys} from "../../../../../common/utils/constants";
import {OrderKeyboardHandlers} from "../../handlers/keyboard/order_keyboard_handlers";

export const injectOrderKeyboards = () => {
    provider.registerLazySingleton(
        dependencyKeys.skipOrderFieldKeyboard,
        () => new MyLabelKeyboard(
            "common.rms.skip",
            OrderKeyboardHandlers.skip
        )
    )
    provider.registerLazySingleton(
        dependencyKeys.cancelOrderKeyboard,
        () => new MyLabelKeyboard(
            "common.rms.cancel",
            OrderKeyboardHandlers.cancel
        )
    )
}
