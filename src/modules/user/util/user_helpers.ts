import {provider, TelegrafContext} from "telegraf-721";
import {Config} from "../../../config/config";
import {dependencyKeys} from "../../../common/utils/constants";

export const isChannelMember = async (ctx: TelegrafContext) => {
    const config = provider.get<Config>(dependencyKeys.config)
    const groupUser = await ctx.telegram.getChatMember(
        config.channelId!,
        ctx.from!.id
    )
    if (groupUser instanceof Error) return false
    else {
        return groupUser.status != "kicked" && groupUser.status != "left"
    }
}
