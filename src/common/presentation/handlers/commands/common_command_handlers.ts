import {TelegrafContext} from "../../../utils/telegraf_types/context_types";
import {provider} from "../../../../injection";
import {dependencyKeys, sceneKeys} from "../../../utils/constants";
import {FetchUserByTelegramId} from "../../../../modules/user/domain/use_cases/fetch_user_by_telegram_id";
import {CommonHandlers} from "../common_handlers";

export class CommonCommandHandlers {
    static async start(ctx: TelegrafContext) {
        const fetchUserByTelegramIdResponse = await provider
            .get<FetchUserByTelegramId>(dependencyKeys.fetchUserByTelegramId).execute(ctx.from!.id.toString())
        return fetchUserByTelegramIdResponse.fold(async l => {
            await ctx.replyWithHTML(l.messageLocaleKey)
        }, async r => {
            if (r.value.length) {
                return CommonHandlers.sendMainMenuMessage(ctx)
            } else {
                return ctx.scene.enter(sceneKeys.userRegistration)
            }
        })
    }
}
