import {provider} from "telegraf-721";
import {dependencyKeys} from "../../../utils/constants";
import {MyLabelPatternKeyboard} from "../../../utils/telegraf_helper/my_keyboard";
import {CommonKeyboardHandlers} from "../../handlers/keyboards/common_keyboard_handlers";

export const injectCommonKeyboards = () => {
    provider.registerLazySingleton(
        dependencyKeys.botToScenesKeyboard,
        () => new MyLabelPatternKeyboard(
            ".+",
            CommonKeyboardHandlers.botToScenes
        )
    )
}
