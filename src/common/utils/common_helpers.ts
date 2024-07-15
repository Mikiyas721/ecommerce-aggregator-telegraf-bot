import {Telegraf} from "telegraf";
import {TelegrafContext} from "./telegraf_types/context_types";
import {provider} from "../../injection";
import {Config} from "../../config/config";
import {dependencyKeys} from "./constants";

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
