import {TelegrafContext} from "../../../../../common/utils/telegraf_types/context_types";
import {dependencyKeys, sceneKeys} from "../../../../../common/utils/constants";
import {provider} from "telegraf-721";
import {Config} from "../../../../../config/config";

export class MainMenuKeyboardHandlers {
    static async invite(ctx: TelegrafContext) {
        const config = provider.get<Config>(dependencyKeys.config)
        return ctx.replyWithHTML(ctx.i18n.t("mainMenu.msg.info.invitationMsg", {
            botLink: config.botLink,
            telegramId: ctx.from!.id,
            channelLink: config.channelLink,
        }))
    }

    static async myWallet(ctx: TelegrafContext) {
        return ctx.scene.enter(sceneKeys.myWallet)
    }

    static async myOrders(ctx: TelegrafContext) {
        return ctx.replyWithHTML("Coming Soon")
    }
}
