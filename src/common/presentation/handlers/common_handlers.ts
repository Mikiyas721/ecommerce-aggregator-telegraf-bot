import {TelegrafContext} from "../../utils/telegraf_types/context_types";
import {MyMarkup} from "../../utils/telegraf_helper/my_markup";
import {provider} from "../../../injection";
import {dependencyKeys} from "../../utils/constants";

export class CommonHandlers {
    static async sendMainMenuMessage(ctx: TelegrafContext) {
        await ctx.replyWithHTML(
            ctx.i18n.t("user.msg.info.mainMenu")
        )
        return ctx.scene?.leave()
    }
}
