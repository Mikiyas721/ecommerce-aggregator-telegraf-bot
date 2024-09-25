import {provider, TelegrafContext, Either, Failure, MyMarkup} from "telegraf-721";
import {dependencyKeys} from "./constants";
import {FetchUserByTelegramId} from "../../modules/user/domain/use_cases/fetch_user_by_telegram_id";

export const clearKeyboards = async (ctx: TelegrafContext) => {
    const message = await ctx.replyWithHTML("*", MyMarkup.getRemoveKeyboardMarkup());
    await ctx.deleteMessage(message.getRight()?.message_id)
}

export const undefinedIndices = (myList: any[]) => {
    let indices = []
    for (let i = 0; i < myList.length; i++) {
        if (myList[i] === undefined) {
            indices.push(i)
        }
    }
    return indices
}

export const sendErrorMessage = async (ctx: TelegrafContext, content: {
    message: string,
    actionBeforeMessage?: (ctx: TelegrafContext) => any,
    actionAfterMessage?: (ctx: TelegrafContext) => any,
}) => {
    if (content.actionBeforeMessage) await content.actionBeforeMessage(ctx)

    await ctx.replyWithHTML(content.message)

    if (content.actionAfterMessage) await content.actionAfterMessage(ctx)
}

export const sendUseOnlyButtonsAboveErrorMsg = async (ctx: TelegrafContext, actions: {
    actionBeforeMessage?: (ctx: TelegrafContext) => any,
    actionAfterMessage?: (ctx: TelegrafContext) => any,
} = {}) => {
    return sendErrorMessage(ctx, {
        message: ctx.i18n.t("common.msg.err.onlyBtnAbove"),
        actionBeforeMessage: actions.actionBeforeMessage,
        actionAfterMessage: actions.actionAfterMessage
    })
}

export const sendUseOnlyButtonsBelowErrorMsg = async (ctx: TelegrafContext, actions: {
    actionBeforeMessage?: (ctx: TelegrafContext) => any,
    actionAfterMessage?: (ctx: TelegrafContext) => any,
} = {}) => {
    return sendErrorMessage(ctx, {
        message: ctx.i18n.t("common.msg.err.onlyBtnBelow"),
        actionBeforeMessage: actions.actionBeforeMessage,
        actionAfterMessage: actions.actionAfterMessage
    })
}

interface UserInfo {
    userId: string,
}

export const getUserInfoFromCacheOrRemote = async (ctx: TelegrafContext): Promise<Either<Failure, UserInfo>> => {
    const {userId} = ctx.session
    if (userId != undefined) {
        return Either.right({
            userId
        })
    }
    const fetchUserInfoByTelegramIdResponse = await provider.get<FetchUserByTelegramId>(dependencyKeys.fetchUserByTelegramId)
        .execute(ctx.from!.id.toString())
    return fetchUserInfoByTelegramIdResponse.fold(
        l => Either.left(l),
        r => {
            const userInfo = {
                userId: r[0].id!,
            }

            ctx.session.userId = userInfo.userId

            return Either.right(userInfo)
        }
    )
}
