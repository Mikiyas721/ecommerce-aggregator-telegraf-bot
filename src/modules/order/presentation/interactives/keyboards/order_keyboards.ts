import {provider} from "../../../../../injection";
import {dependencyKeys} from "../../../../../common/utils/constants";
import {MyLabelKeyboard} from "../../../../../common/utils/telegraf_helper/my_keyboard";
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
