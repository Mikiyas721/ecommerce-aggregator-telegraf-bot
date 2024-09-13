import {TelegrafContext} from "../../utils/telegraf_types/context_types";
import {provider} from "../../../injection";
import {FetchUserByTelegramId} from "../../../modules/user/domain/use_cases/fetch_user_by_telegram_id";
import {dependencyKeys, sceneKeys} from "../../utils/constants";

export class CommonHandlers {
    static async fromBotToScenes(ctx: TelegrafContext) {
        const fetchUserByTelegramIdResponse = await provider
            .get<FetchUserByTelegramId>(dependencyKeys.fetchUserByTelegramId).execute(ctx.from!.id.toString())
        return fetchUserByTelegramIdResponse.fold(async l => {
            await ctx.replyWithHTML(l.messageLocaleKey)
        }, async r => {
            if (r.value.length) {
                ctx.session.userId = r.value[0].id
                return ctx.scene.enter(sceneKeys.mainMenu)
            } else {
                return ctx.scene.enter(sceneKeys.userRegistration)
            }
        })
    }
}
