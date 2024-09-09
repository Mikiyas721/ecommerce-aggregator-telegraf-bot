import {TelegrafContext} from "../../../../../common/utils/telegraf_types/context_types";
import {dependencyKeys} from "../../../../../common/utils/constants";
import {provider} from "../../../../../injection";
import {Config} from "../../../../../config/config";

export class MainMenuKeyboardHandlers {
    static async invite(ctx: TelegrafContext) {
        const config = provider.get<Config>(dependencyKeys.config)
        return ctx.replyWithMarkdown(ctx.i18n.t("user.msg.info.invitationMsg", {
            botLink: config.botLink,
            telegramId: ctx.from!.id,
        }))
    }

    static async myWallet(_: TelegrafContext) {
    }

    static async myOrders(_: TelegrafContext) {
    }
}
