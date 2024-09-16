import {FeedbackHandlers} from "../feedback_handlers";
import {provider, TelegrafContext} from "telegraf-721";
import {AddFeedback} from "../../../domain/use_cases/add_feedback";
import {dependencyKeys, sceneKeys} from "../../../../../common/utils/constants";
import {Feedback} from "../../../domain/entities/feedback";

export class FeedbackInlineKeyboardHandlers {
    static async confirm(ctx: TelegrafContext) {
        const addFeedbackResponse = await provider.get<AddFeedback>(dependencyKeys.addFeedback).execute(
            Feedback.createFromValidated(ctx.scene.state.feedback, ctx.scene.state.userId)
        )
        return addFeedbackResponse.fold(async l => {
            await ctx.replyWithHTML(l.messageLocaleKey)
        }, async _ => {
            await ctx.replyWithHTML(ctx.i18n.t("user.msg.info.addFeedbackSuccess"))
            await ctx.deleteMessage()
            return ctx.scene.enter(sceneKeys.mainMenu)
        })
    }

    static async cancel(ctx: TelegrafContext) {
        await ctx.deleteMessage()
        return ctx.scene.enter(sceneKeys.mainMenu)
    }

    static async edit(ctx: TelegrafContext) {
        await ctx.deleteMessage()
        return FeedbackHandlers.toBody(ctx)
    }
}
