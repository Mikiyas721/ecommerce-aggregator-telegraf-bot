import {provider} from "telegraf-721";
import {dependencyKeys} from "../../../../../common/utils/constants";
import {MyExtraFunctionKeyboard} from "../../../../../common/utils/telegraf_helper/my_keyboard";

export const injectUserRegistrationKeyboards = () => {
    provider.registerLazySingleton(
        dependencyKeys.sharePhoneNumberKeyboard,
        () => new MyExtraFunctionKeyboard(
            "user.rms.sharePhoneNumber", {
                requestContact: true
            }
        )
    )
}
