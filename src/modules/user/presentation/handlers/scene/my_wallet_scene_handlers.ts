import {provider, TelegrafContext} from "telegraf-721";
import {FetchUserByTelegramId} from "../../../domain/use_cases/fetch_user_by_telegram_id";
import {dependencyKeys} from "../../../../../common/utils/constants";
import {FetchMyWallet} from "../../../domain/use_cases/fetch_my_wallet";
import {clearKeyboards, sendUseOnlyButtonsAboveErrorMsg} from "../../../../../common/utils/common_helpers";
import {UserReplyMarkups} from "../../../util/user_reply_markups";

export class MyWalletSceneHandlers {
    static async enter(ctx: TelegrafContext) {
        const fetchUserByTelegramIdResponse = await provider.get<FetchUserByTelegramId>(dependencyKeys.fetchUserByTelegramId)
            .execute(ctx.from!.id.toString())
        return fetchUserByTelegramIdResponse.fold(async l => {
            await ctx.replyWithHTML(l.messageLocaleKey)
        }, async user => {
            ctx.scene.state.userId = user.value[0].id!
            const fetchMyWallet = await provider.get<FetchMyWallet>(dependencyKeys.fetchMyWallet)
                .execute(user.value[0].id!)
            return fetchMyWallet.fold(async l => {
                await ctx.replyWithHTML(l.messageLocaleKey)
            }, async r => {
                ctx.scene.state.balance = (r.totalAmountInETC / 100 - r.totalRewardedAmountInETC / 100).toFixed(2)
                await ctx.replyWithHTML(
                    ctx.i18n.t("user.msg.info.userWalletSummary", {
                        totalBalance: ctx.scene.state.balance,
                        totalEarning: (r.totalAmountInETC / 100).toFixed(2),
                        totalWithdraw: (r.totalRewardedAmountInETC / 100).toFixed(2),
                    }),
                    UserReplyMarkups.myWalletMenu(ctx)
                )
                await clearKeyboards(ctx)
            })
        })
    }

    static async chooseAction(ctx: TelegrafContext) {
        return sendUseOnlyButtonsAboveErrorMsg(ctx)
    }
}
