import {provider} from "../injection";
import {dependencyKeys} from "../common/utils/constants";
import {undefinedIndices} from "../common/utils/common_helpers";

export class Config {
    private constructor(
        readonly botToken: string,
        readonly apiBaseUrl: string,
        readonly apiAccessToken: string | undefined,
        readonly isProduction: boolean,
        readonly serverUrl: string,
        readonly botLink: string,
        readonly webhookPort: number | undefined,
        readonly logInvoked: boolean,
        readonly redisUrl: string | undefined,
        readonly testEnv: boolean | undefined,
    ) {
    }

    static createFromEnv(
        botToken: string | undefined,
        apiBaseUrl: string | undefined,
        apiAccessToken: string | undefined,
        isProduction: boolean | undefined,
        serverUrl: string | undefined,
        botLink: string | undefined,
        webhookPort: number | undefined,
        logInvoked: boolean | undefined,
        redisUrl: string | undefined,
        testEnv: boolean | undefined,
    ) {
        const indices = undefinedIndices([
            botToken,
            apiBaseUrl,
            isProduction,
            botLink,
            logInvoked,
            testEnv,
        ])

        if (indices.length) {
            throw Error(`Missing configuration from environment variables. List indices ${indices}`)
        }

        if (
            isProduction && webhookPort == undefined ||
            isProduction && serverUrl == undefined
        ) {
            throw Error("Missing configuration webhookPort or serverUrl when inProduction")
        }

        return new Config(
            botToken!,
            apiBaseUrl!,
            apiAccessToken,
            isProduction!,
            serverUrl!,
            botLink!,
            webhookPort,
            logInvoked!,
            redisUrl,
            testEnv!,
        )
    }
}

export const injectConfigFromEnv = () => {
    provider.registerSingleton(dependencyKeys.config, Config.createFromEnv(
        process.env.BOT_TOKEN,
        process.env.API_BASE_URL,
        process.env.API_ACCESS_TOKEN,
        process.env.IS_PRODUCTION == undefined ? undefined : process.env.IS_PRODUCTION == "true",
        process.env.SERVER_URL,
        process.env.BOT_LINK,
        process.env.WEBHOOK_PORT == undefined ? undefined : parseInt(process.env.WEBHOOK_PORT),
        process.env.LOG_INVOKED == undefined ? undefined : process.env.LOG_INVOKED == "true",
        process.env.REDIS_URL,
        process.env.TEST_ENV == "true",
    ))
}
