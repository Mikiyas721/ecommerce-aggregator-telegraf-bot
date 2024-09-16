import {TelegrafContext} from "../../../../common/utils/telegraf_types/context_types";
import {provider} from "telegraf-721";
import {PlaceOrder} from "../../domain/use_cases/place_order";
import {dependencyKeys} from "../../../../common/utils/constants";
import {Order} from "../../domain/entities/order";
import {Markup} from "telegraf";

export class OrderHandlers {
    static async placeOrder(ctx: TelegrafContext) {
        const placeOrderResponse = await provider.get<PlaceOrder>(dependencyKeys.placeOrder).execute(
            Order.createFromValidated(
                ctx.scene.state.deliveryDate,
                ctx.scene.state.deliveryAddress,
                ctx.scene.state.note,
                ctx.scene.state.userId,
                ctx.scene.state.productId
            )
        )
        return placeOrderResponse.fold(async l => {
            await ctx.replyWithHTML(ctx.i18n.t(l.messageLocaleKey))
        }, async _ => {
            await ctx.replyWithHTML(
                ctx.i18n.t("order.msg.info.orderSuccess"),
                Markup.removeKeyboard()
            )
            return ctx.scene.leave()
        })
    }
}
