import 'dotenv/config'
import {Scenes, session} from "telegraf";
import {dependencyKeys} from "./common/utils/constants";
import {MyBot} from "./common/utils/telegraf_helper/my_bot";
import {Config} from "./config/config";
import {injectDependencies, provider} from "./injection";
import {Translator} from "./modules/localization/translator";
import RedisSession from "telegraf-session-redis";

async function main() {
    await injectDependencies()

    const botConfig = provider.get<Config>(dependencyKeys.config)
    const i18n = provider.get<Translator>(dependencyKeys.translator)

    const bot = new MyBot(
        botConfig.botToken,
        {
            middlewares: [
                provider.get<Scenes.Stage<any>>(dependencyKeys.mainStage).middleware(),
            ],
            interactors: {
                keyboards: [
                    provider.get(dependencyKeys.botToScenesKeyboard)
                ],
                inlineKeyboards: [],
                commands: [
                    provider.get(dependencyKeys.startCommand),
                    provider.get(dependencyKeys.feedbackCommand)
                ]
            },
            translatorMiddleware: i18n.middleware(),
            session: botConfig.redisUrl ? new RedisSession({
                store: {
                    url: botConfig.redisUrl!,
                    host: '127.0.0.1',
                    port: 6379,
                    ...(botConfig.redisUrl?.startsWith('rediss') ? {tls: {}} : {})
                },
                getSessionKey: (ctx) => {
                    if (!ctx.from || !ctx.chat) {
                        return
                    }
                    return `Qinash|${ctx.from.id}:${ctx.chat.id}`
                }
            }) : session(),
            testEnv: botConfig.testEnv
        }
    );

    if (botConfig.isProduction) {
        bot.startWebHook(botConfig.serverUrl as string, botConfig.webhookPort!)
            .catch(console.error);
    } else {
        bot.launch({
                onLaunch: () => {
                    console.log("Bot launched")
                }
            }
        ).catch((err: any) => {
            console.error(err);
        });
    }

    process.once('SIGINT', () => bot.stop('SIGINT'));
    process.once('SIGTERM', () => bot.stop('SIGTERM'));
}

main().catch((err: any) => {
    console.error(err);
});
