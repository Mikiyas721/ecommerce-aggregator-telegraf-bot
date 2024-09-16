import {provider, MyExtraFunctionKeyboard} from "telegraf-721";
import {dependencyKeys} from "../../../../../common/utils/constants";

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
