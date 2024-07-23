import {provider} from "../../../../../injection";
import {dependencyKeys} from "../../../../../common/utils/constants";
import {MyCoreCallbackInlineKeyboard} from "../../../../../common/utils/telegraf_helper/my_inline_keyboard";
import {FeedbackInlineKeyboardHandlers} from "../../handlers/inline_keyboard/feedback_inline_keyboard_handlers";

export const injectFeedbackInlineKeyboards = () => {
    provider.registerLazySingleton(
        dependencyKeys.confirmFeedbackInlineKeyboard,
        () => new MyCoreCallbackInlineKeyboard(
            "common.rms.confirm",
            "confirmFeedback",
            FeedbackInlineKeyboardHandlers.confirm
        )
    )
    provider.registerLazySingleton(
        dependencyKeys.cancelFeedbackInlineKeyboard,
        () => new MyCoreCallbackInlineKeyboard(
            "common.rms.cancel",
            "cancelFeedback",
            FeedbackInlineKeyboardHandlers.cancel
        )
    )
    provider.registerLazySingleton(
        dependencyKeys.editFeedbackInlineKeyboard,
        () => new MyCoreCallbackInlineKeyboard(
            "common.rms.edit",
            "editFeedback",
            FeedbackInlineKeyboardHandlers.edit
        )
    )
}
