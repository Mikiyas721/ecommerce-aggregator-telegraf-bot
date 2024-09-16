import {provider, MyLabelPatternKeyboard} from "telegraf-721";
import {dependencyKeys} from "../../../utils/constants";
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
