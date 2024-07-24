import {TelegrafContext} from "../../../../../common/utils/telegraf_types/context_types";
import {CommonHandlers} from "../../../../../common/presentation/handlers/common_handlers";

export class FeedbackKeyboardHandlers {
    static async cancel(ctx: TelegrafContext) {
        return CommonHandlers.sendMainMenuMessage(ctx)
    }
}
