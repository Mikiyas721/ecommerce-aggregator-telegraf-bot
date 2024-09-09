import {TelegrafContext} from "../../../utils/telegraf_types/context_types";
import {provider} from "../../../../injection";
import {dependencyKeys, sceneKeys} from "../../../utils/constants";
import {FetchUserByTelegramId} from "../../../../modules/user/domain/use_cases/fetch_user_by_telegram_id";
import {CommonHandlers} from "../common_handlers";
import {CreateInvitation} from "../../../../modules/user/domain/use_cases/create_invitation";
import {Invitation} from "../../../../modules/user/domain/entities/invitation";

export class CommonCommandHandlers {
    static async start(ctx: TelegrafContext) {
        const fetchUserByTelegramIdResponse = await provider
            .get<FetchUserByTelegramId>(dependencyKeys.fetchUserByTelegramId).execute(ctx.from!.id.toString())
        return fetchUserByTelegramIdResponse.fold(async l => {
            await ctx.replyWithHTML(l.messageLocaleKey)
        }, async r => {
            const dataSplit: string[] | undefined = (ctx.message!.text!.split(" ")?.at(1) as string)
                ?.split("-")
            const action = dataSplit?.at(0)
            const id = dataSplit?.at(1)
            if (r.value.length) {
                ctx.session.userId = r.value[0].id
                return CommonCommandHandlers.handleStartCommandAction(ctx, action, id, false)
            } else {
                return ctx.scene.enter(sceneKeys.userRegistration, {
                    action,
                    id
                })
            }
        })
    }

    static async feedback(ctx: TelegrafContext) {
        const fetchUserByTelegramIdResponse = await provider
            .get<FetchUserByTelegramId>(dependencyKeys.fetchUserByTelegramId).execute(ctx.from!.id.toString())
        return fetchUserByTelegramIdResponse.fold(async l => {
            await ctx.replyWithHTML(l.messageLocaleKey)
        }, async r => {
            if (r.value.length) {
                return ctx.scene.enter(sceneKeys.feedback, {
                    userId: r.value[0].id
                })
            } else {
                return ctx.scene.enter(sceneKeys.userRegistration, {
                    productId: undefined
                })
            }
        })
    }

    static async handleStartCommandAction(
        ctx: TelegrafContext,
        action: string | undefined,
        id: string | undefined,
        userIsNew: boolean = true
    ) {
        if (action && id) {
            if (action == "order") {
                return ctx.scene.enter(sceneKeys.order, {
                    productId: id
                })
            } else if (action == "invite" && userIsNew) {
                const fetchUserByTelegramIdResponse = await provider.get<FetchUserByTelegramId>(dependencyKeys.fetchUserByTelegramId)
                    .execute(id, false)
                await fetchUserByTelegramIdResponse.fold(async l => {
                    await ctx.replyWithHTML(ctx.i18n.t(l.messageLocaleKey))
                }, async r => {
                    const createInvitationResponse = await provider.get<CreateInvitation>(dependencyKeys.createInvitation)
                        .execute(Invitation.create(undefined, r.value[0].id!, ctx.session.userId))
                    await createInvitationResponse.fold(async l => {
                        await ctx.replyWithHTML(ctx.i18n.t(l.messageLocaleKey))
                    }, async _ => {
                        await ctx.replyWithHTML(ctx.i18n.t("user.msg.info.invitationCreated"))
                    })
                })
            }
        }
        return ctx.scene.enter(sceneKeys.mainMenu)
    }
}
