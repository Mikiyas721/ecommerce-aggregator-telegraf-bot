import {TelegrafContext} from "../../../../../common/utils/telegraf_types/context_types";
import {MyMarkup} from "../../../../../common/utils/telegraf_helper/my_markup";
import {provider} from "telegraf-721";
import {DeliveryDate} from "../../../domain/value_objects/delivery_date";
import {dependencyKeys} from "../../../../../common/utils/constants";
import {DeliveryAddress} from "../../../domain/value_objects/delivery_address";
import {Note} from "../../../domain/value_objects/note";
import {OrderHandlers} from "../order_handlers";

export class OrderSceneHandlers {
    static async enter(ctx: TelegrafContext) {
        return ctx.replyWithHTML(
            ctx.i18n.t("order.msg.pmt.deliveryDate"),
            MyMarkup.getKeyboardMarkup(ctx, [
                provider.get(dependencyKeys.cancelOrderKeyboard)
            ])
        )
    }

    static async deliveryDate(ctx: TelegrafContext) {
        return DeliveryDate.createForGC(ctx.message?.text).fold(async l => {
            await ctx.replyWithHTML(ctx.i18n.t(l.messageLocaleKey))
        }, async r => {
            ctx.scene.state.deliveryDate = r.value

            await ctx.replyWithHTML(ctx.i18n.t("order.msg.pmt.deliveryAddress"))
            return ctx.wizard.selectStep(1)
        })
    }

    static async deliveryAddress(ctx: TelegrafContext) {
        return DeliveryAddress.create(ctx.message?.text).fold(async l => {
            await ctx.replyWithHTML(ctx.i18n.t(l.messageLocaleKey))
        }, async r => {
            ctx.scene.state.deliveryAddress = r.value

            await ctx.replyWithHTML(
                ctx.i18n.t("order.msg.pmt.note"),
                MyMarkup.getKeyboardMarkup(ctx, [
                    provider.get(dependencyKeys.skipOrderFieldKeyboard),
                    provider.get(dependencyKeys.cancelOrderKeyboard)
                ])
            )
            return ctx.wizard.selectStep(2)
        })
    }

    static async note(ctx: TelegrafContext) {
        return Note.create(ctx.message?.text).fold(async l => {
            await ctx.replyWithHTML(ctx.i18n.t(l.messageLocaleKey))
        }, async r => {
            ctx.scene.state.note = r.value

            return OrderHandlers.placeOrder(ctx)
        })
    }
}
