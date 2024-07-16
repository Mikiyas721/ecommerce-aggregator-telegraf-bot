import {TelegrafContext} from "../../../../../common/utils/telegraf_types/context_types";
import {MyMarkup} from "../../../../../common/utils/telegraf_helper/my_markup";
import {PhoneNumber} from "../../../domain/value_objects/phoneNumber";
import {provider} from "../../../../../injection";
import {dependencyKeys, sceneKeys} from "../../../../../common/utils/constants";
import {RegisterUser} from "../../../domain/use_cases/register_user";
import {User} from "../../../domain/entities/user";
import {CommonHandlers} from "../../../../../common/presentation/handlers/common_handlers";
import {Markup} from "telegraf";
import {Name} from "../../../domain/value_objects/name";

export class UserRegistrationSceneHandlers {
    static async enter(ctx: TelegrafContext) {
        await ctx.replyWithHTML(ctx.i18n.t("user.msg.info.registrationInfo"))
        await ctx.replyWithHTML(
            ctx.i18n.t("user.msg.pmt.enterPhoneNumber"),
            MyMarkup.getKeyboardMarkup(ctx, [
                provider.get(dependencyKeys.sharePhoneNumberKeyboard),
                provider.get(dependencyKeys.skipUserRegistrationKeyboard)
            ], {countInRow: 1})
        )
    }

    static async phoneNumber(ctx: TelegrafContext) {
        if (ctx.message?.contact) {
            if (ctx.from!.id == ctx.update.message!.contact!.user_id) {
                return PhoneNumber.createForEthiopianMobilePhone(ctx.message.contact.phone_number).fold(async l => {
                    await ctx.replyWithHTML(ctx.i18n.t(l.messageLocaleKey))
                }, async r => {
                    ctx.scene.state.phoneNumber = r.with09Format
                    await ctx.replyWithHTML(
                        ctx.i18n.t("user.msg.pmt.enterFirstName"),
                        Markup.removeKeyboard()
                    )
                    return ctx.wizard.selectStep(1)
                })
            } else {
                return ctx.replyWithHTML(ctx.i18n.t("user.msg.err.notYourNumber"))
            }
        } else {
            return ctx.replyWithHTML(ctx.i18n.t("user.msg.err.manuallyEnteredPhone"))
        }
    }

    static async firstName(ctx: TelegrafContext) {
        return Name.createForFirstName(ctx.message?.text).fold(async l => {
            await ctx.replyWithHTML(ctx.i18n.t(l.messageLocaleKey))
        }, async r => {
            ctx.scene.state.firstName = r.value
            await ctx.replyWithHTML(
                ctx.i18n.t("user.msg.pmt.enterLastName"),
                Markup.removeKeyboard()
            )
            return ctx.wizard.selectStep(2)
        })
    }

    static async lastName(ctx: TelegrafContext) {
        return Name.createForLastName(ctx.message?.text).fold(async l => {
            await ctx.replyWithHTML(ctx.i18n.t(l.messageLocaleKey))
        }, async r => {
            ctx.scene.state.lastName = r.value
            const registerUserResponse = await provider
                .get<RegisterUser>(dependencyKeys.registerUser).execute(
                    User.createFromValidated(
                        ctx.scene.state.firstName,
                        r.value,
                        ctx.scene.state.phoneNumber,
                        ctx.from!.id.toString()
                    )
                )
            return registerUserResponse.fold(async l => {
                await ctx.replyWithHTML(l.messageLocaleKey)
            }, async r => {
                if (ctx.scene.state.productId) {
                    return ctx.scene.enter(sceneKeys.order, {
                        userId: r.id,
                        productId: ctx.scene.state.productId
                    })
                }
                await ctx.replyWithHTML(ctx.i18n.t("user.msg.info.registrationSuccess"))
                return CommonHandlers.sendMainMenuMessage(ctx)
            })
        })
    }
}
