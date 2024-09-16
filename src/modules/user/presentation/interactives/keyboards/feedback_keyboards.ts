import {provider, MyLabelKeyboard} from "telegraf-721";
import {dependencyKeys} from "../../../../../common/utils/constants";
import {FeedbackKeyboardHandlers} from "../../handlers/keyboard/feedback_keyboard_handlers";

export const injectFeedbackKeyboard = () => {
    provider.registerLazySingleton(
        dependencyKeys.cancelFeedbackKeyboard,
        () => new MyLabelKeyboard(
            "common.rms.cancel",
            FeedbackKeyboardHandlers.cancel
        )
    )
}
