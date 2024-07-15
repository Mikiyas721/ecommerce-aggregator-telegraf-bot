import {provider} from "../../../../../injection";
import {dependencyKeys} from "../../../../../common/utils/constants";
import {MyExtraFunctionKeyboard, MyLabelKeyboard} from "../../../../../common/utils/telegraf_helper/my_keyboard";
import {UserRegistrationKeyboardHandlers} from "../../handlers/keyboard/user_registration_keyboard_handlers";

export const injectUserRegistrationKeyboards = () => {
    provider.registerLazySingleton(
        dependencyKeys.sharePhoneNumberKeyboard,
        () => new MyExtraFunctionKeyboard(
            "user.rms.sharePhoneNumber", {
                requestContact: true
            }
        )
    )
    provider.registerLazySingleton(
        dependencyKeys.skipUserRegistrationKeyboard,
        () => new MyLabelKeyboard(
            "user.rms.skip",
            UserRegistrationKeyboardHandlers.skip
        )
    )
}
