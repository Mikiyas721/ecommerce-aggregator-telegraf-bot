import {TelegrafContext} from "../../../../common/utils/telegraf_types/context_types";
import {MyMarkup} from "../../../../common/utils/telegraf_helper/my_markup";
import {provider} from "telegraf-721";
import {dependencyKeys} from "../../../../common/utils/constants";

export class FeedbackHandlers {
    static async toBody(ctx: TelegrafContext) {
        await ctx.replyWithHTML(
            ctx.i18n.t("user.msg.pmt.feedback"),
            MyMarkup.getKeyboardMarkup(ctx, [
                provider.get(dependencyKeys.cancelFeedbackKeyboard)
            ])
        )
        return ctx.wizard?.selectStep(0)
    }
}
