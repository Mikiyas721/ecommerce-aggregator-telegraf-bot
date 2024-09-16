import {Markup, Telegraf} from "telegraf";
import {TelegrafContext} from "./telegraf_types/context_types";
import {provider} from "telegraf-721";
import {Config} from "../../config/config";
import {dependencyKeys} from "./constants";
import {Either} from "./fp/f_p";
import {Failure} from "./abstracts";
import {MyResult} from "./either";
import {FetchUserByTelegramId} from "../../modules/user/domain/use_cases/fetch_user_by_telegram_id";
import * as console from "node:console";

export const clearKeyboards = async (ctx: TelegrafContext) => {
    const message = await ctx.replyWithHTML("*", Markup.removeKeyboard());
    await ctx.deleteMessage(message.message_id)
}

export const isInlineButtonRequest = (ctx: TelegrafContext) => {
    return ctx?.update?.callback_query != undefined
}

export const handlerFactory = <T = void, F = void>(
    params: {
        logLabel: string,
        handler: (ctx: TelegrafContext) => Promise<T> | T,
        onFailure?: () => Promise<F> | F,
        logHandlerInvoked?: boolean,
        logWithTimeStamp?: boolean,
        withUpdateTypes?: any
    }
) => {
    const generatedHandler = async (ctx: any) => {
        const chatType = ctx?.message?.chat?.type ?? ctx?.update?.callback_query?.message?.chat?.type
        if (chatType == "private") {
            try {
                if (provider.get<Config>(dependencyKeys.config).logInvoked || params.logHandlerInvoked) {
                    console.log(
                        params.logWithTimeStamp ?
                            `${new Date(Date.now()).toString()} ${params.logLabel}` :
                            `${params.logLabel}`
                    )
                }
                return await params.handler(ctx)
            } catch (e) {
                if (params.onFailure) {
                    try {
                        return await params.onFailure()
                    } catch (e) {
                        console.log(`Error caught in ${params.logLabel} onFailure`)
                        return console.log(e)
                    }
                } else {
                    console.log(`Error caught in ${params.logLabel}`)
                    return console.log(e)
                }
            }
        } else {
            if (isInlineButtonRequest(ctx)) await ctx.answerCbQuery()
            return ctx.replyWithHTML(ctx.i18n.t("common.msg.err.goToBotMsg"))
        }
    }
    if (params.withUpdateTypes) {
        return Telegraf.on(params.withUpdateTypes, generatedHandler)
    } else {
        return generatedHandler
    }
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

export const getUserInfoFromCacheOrRemote = async (ctx: TelegrafContext): Promise<Either<Failure, MyResult<UserInfo>>> => {
    const {userId} = ctx.session
    if (userId != undefined) {
        return Either.right(new MyResult({
            userId
        }))
    }
    const fetchUserInfoByTelegramIdResponse = await provider.get<FetchUserByTelegramId>(dependencyKeys.fetchUserByTelegramId)
        .execute(ctx.from!.id.toString())
    return fetchUserInfoByTelegramIdResponse.fold(
        l => Either.left(l),
        r => {
            const userInfo = {
                userId: r.value[0].id!,
            }

            ctx.session.userId = userInfo.userId

            return Either.right(new MyResult(userInfo))
        }
    )
}
