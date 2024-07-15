import {Context, MiddlewareFn, Telegraf} from "telegraf";
import {HandledKeyboard} from "./my_keyboard";
import {MyCallbackInlineKeyboard} from "./my_inline_keyboard";
import {MyCommand} from "./my_command";
import {MyContext} from "./my_scene";
import {handlerFactory} from "../common_helpers";
import {Telegram} from "telegraf";
import {Either} from "../fp/f_p";
import {SimpleFailure} from "../either";
import {Success} from "../abstracts";

async function mutateTelegrafAPICallFunction(tg: Telegram) {
    const oldCallApi: typeof tg.callApi = tg.callApi.bind(tg);
    tg.callApi = async function newCallApi(method, payload, signal) {
        return oldCallApi(method, payload, signal)
            .then((value) => {
                return Either.right(new Success(value))
            })
            .catch((e) => {
                console.log("Error caught in callApi\n", e)
                return Either.left(new SimpleFailure(e.message))
            }) as any;
    };
}

export class MyBot {
    private instance: Telegraf<MyContext>;

    constructor(
        token: string,
        config?: {
            middlewares?: MiddlewareFn<Context>[],
            interactors?: {
                keyboards?: Array<HandledKeyboard>,
                inlineKeyboards?: Array<MyCallbackInlineKeyboard>,
                commands?: Array<MyCommand>,
            },
            session?: any,
            translatorMiddleware?: any,
            rateLimit?: any,
            testEnv?: boolean
        }
    ) {
        this.instance = new Telegraf(token, {telegram: {testEnv: config?.testEnv}});

        this.instance.use(async (ctx, next) => {
            await mutateTelegrafAPICallFunction(ctx.telegram);
            return next();
        })

        if (config?.session) this.instance.use(config?.session)

        if (config?.rateLimit) this.instance.use(config?.rateLimit)

        if (config?.translatorMiddleware) this.instance.use(config?.translatorMiddleware)

        config?.middlewares?.forEach((middleware: MiddlewareFn<Context>) => {
            this.instance.use(middleware)
        })

        config?.interactors?.commands?.forEach((cmd) => {
            this.instance.command(
                cmd.command,
                handlerFactory({
                    logLabel: `Bot|(${cmd.command})CommandHandler |*| Function Name ${cmd.handler.name}`,
                    handler: cmd.handler
                })
            )
        })

        config?.interactors?.inlineKeyboards?.forEach((ikd) => {
            this.instance.action(
                ikd.key,
                handlerFactory({
                    logLabel: `Bot|([LBL]${ikd.logLabel})-([CB]${ikd.callbackData})InlineKeyboardHandler |*| Function Name ${ikd.handler.name}`,
                    handler: ikd.handler
                })
            )
        })

        config?.interactors?.keyboards?.forEach((kbd) => {
            this.instance.hears(
                kbd.key,
                handlerFactory({
                    logLabel: `Bot|([LBL]${kbd.logLabel})KeyboardHandler |*| Function Name ${kbd.handler.name}`,
                    handler: kbd.handler
                }) as any
            )
        })

        this.instance.catch((err, _) => {
            console.log("Error caught in instance catch statement")
            console.log(err)
        });
    }

    start(...fns: any) {
        return this.instance.start(fns)
    }

    launch(a?: { config?: Telegraf.LaunchOptions, onLaunch?: () => any }) {
        return this.instance.launch(a?.config ?? {}, a?.onLaunch)
    }

    stop(reason = 'unspecified') {
        return this.instance.stop(reason)
    }

    async startWebHook(domain: string, port: number) {
        console.log(port)
        await this.instance.createWebhook({domain})
    }

    getContext() {
        return this.instance.context
    }
}
