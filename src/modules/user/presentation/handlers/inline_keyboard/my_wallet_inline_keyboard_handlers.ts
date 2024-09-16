import {TelegrafContext} from "../../../../../common/utils/telegraf_types/context_types";
import {provider} from "telegraf-721";
import {CALLBACK_DATA_SEPARATOR, dependencyKeys, sceneKeys} from "../../../../../common/utils/constants";
import {MyMarkup} from "../../../../../common/utils/telegraf_helper/my_markup";
import {MyCoreCallbackInlineKeyboard} from "../../../../../common/utils/telegraf_helper/my_inline_keyboard";
import {UserReplyMarkups} from "../../../util/user_reply_markups";
import {WithdrawReward} from "../../../domain/use_cases/withdraw_reward";

export class MyWalletInlineKeyboardHandlers {
    static async withdraw(ctx: TelegrafContext) {
        if (ctx.scene.state.balance < 5) {
            await ctx.replyWithHTML(ctx.i18n.t("user.msg.info.insufficientBalance"))
            return ctx.answerCbQuery()
        } else {
            const multipleOf5Balance = ctx.scene.state.balance - ctx.scene.state.balance % 5
            const topUpWithdrawButtons = []
            for (let amountToWithdraw = 5; amountToWithdraw <= multipleOf5Balance && amountToWithdraw <= 100; amountToWithdraw += 5) {
                topUpWithdrawButtons.push(
                    provider.get<MyCoreCallbackInlineKeyboard>(dependencyKeys.withdrawWithTopUpInlineKeyboard).mutateAndGet({
                        localizationKey: amountToWithdraw.toString(),
                        translated: true,
                        data: amountToWithdraw.toString(),
                        createNewInstance: true
                    })
                )
            }
            topUpWithdrawButtons.push(
                provider.get(dependencyKeys.withdrawWithTopUpBackInlineKeyboard)
            )
            return ctx.editMessageReplyMarkup(
                MyMarkup.getInlineKeyboardMarkup(ctx, topUpWithdrawButtons).reply_markup
            )
        }
    }

    static async walletBack(ctx: TelegrafContext) {
        await ctx.deleteMessage()
        return ctx.scene.enter(sceneKeys.mainMenu)
    }

    static async withdrawWithTopUp(ctx: TelegrafContext) {
        const waitMessage = await ctx.replyWithHTML(ctx.i18n.t("user.msg.info.processingTopUp"))

        const amountToWithdraw = ctx.callbackQuery!.data!.split(CALLBACK_DATA_SEPARATOR)[1]
        const withdrawRewardResponse = await provider.get<WithdrawReward>(dependencyKeys.withdrawReward)
            .execute(parseFloat(amountToWithdraw), ctx.from!.id.toString())
        return withdrawRewardResponse.fold(async l => {
            await ctx.replyWithHTML(l.messageLocaleKey)
            return ctx.answerCbQuery()
        }, async _ => {
            await ctx.deleteMessage(waitMessage.message_id)
            await ctx.deleteMessage()
            await ctx.replyWithHTML(ctx.i18n.t("user.msg.info.withdrawSuccess"))
            return ctx.scene.enter(sceneKeys.mainMenu)
        })
    }

    static async withdrawWithTopUpBack(ctx: TelegrafContext) {
        return ctx.editMessageReplyMarkup(UserReplyMarkups.myWalletMenu(ctx).reply_markup)
    }
}
