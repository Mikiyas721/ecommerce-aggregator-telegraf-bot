import {OrderHandlers} from "../order_handlers";
import {Markup} from "telegraf";
import {TelegrafContext} from "telegraf-721"

export class OrderKeyboardHandlers {
    static async cancel(ctx: TelegrafContext) {
        return ctx.replyWithHTML(ctx.i18n.t("Exit"), Markup.removeKeyboard())
    }

    static async skip(ctx: TelegrafContext) {
        switch (ctx.wizard.cursor) {
            case 2:
                return OrderHandlers.placeOrder(ctx)
        }
    }
}
