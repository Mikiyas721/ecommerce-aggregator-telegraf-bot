import {TelegrafContext} from "../../../../../common/utils/telegraf_types/context_types";
import {CommonHandlers} from "../../../../../common/presentation/handlers/common_handlers";

export class UserRegistrationKeyboardHandlers {
    static async skip(ctx: TelegrafContext) {
        if (ctx.wizard.cursor == 0) {
            return CommonHandlers.sendMainMenuMessage(ctx)
        }
    }
}
