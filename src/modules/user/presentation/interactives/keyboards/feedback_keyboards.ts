import {provider} from "telegraf-721";
import {dependencyKeys} from "../../../../../common/utils/constants";
import {MyLabelKeyboard} from "../../../../../common/utils/telegraf_helper/my_keyboard";
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
