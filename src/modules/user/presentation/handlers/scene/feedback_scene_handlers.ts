import {TelegrafContext} from "../../../../../common/utils/telegraf_types/context_types";
import {MyMarkup} from "../../../../../common/utils/telegraf_helper/my_markup";
import {FeedbackBody} from "../../../domain/value_objects/feedback_body";
import {Markup} from "telegraf";
import {FeedbackHandlers} from "../feedback_handlers";
import {dependencyKeys} from "../../../../../common/utils/constants";
import {provider} from "../../../../../injection";

export class FeedbackSceneHandlers {
    static async enter(ctx: TelegrafContext) {
        return FeedbackHandlers.toBody(ctx)
    }

    static async body(ctx: TelegrafContext) {
        return FeedbackBody.create(ctx.message?.text).fold(async l => {
            await ctx.replyWithHTML(l.messageLocaleKey)
        }, async r => {
            ctx.scene.state.feedback = r.value
            await ctx.replyWithHTML(ctx.i18n.t("user.msg.pmt.feedbackVer"), Markup.removeKeyboard())
            await ctx.replyWithHTML(
                ctx.i18n.t("user.msg.info.feedbackSummary", {
                    feedback: r.value
                }),
                MyMarkup.getInlineKeyboardMarkup(ctx, [
                    provider.get(dependencyKeys.confirmFeedbackInlineKeyboard),
                    provider.get(dependencyKeys.editFeedbackInlineKeyboard),
                    provider.get(dependencyKeys.cancelFeedbackInlineKeyboard),
                ])
            )
            return ctx.wizard.selectStep(1)
        })
    }

    static async confirmOrDecline(ctx: TelegrafContext) {
        await ctx.replyWithHTML("common.msg.err.onlyBtnAbove")
    }
}
