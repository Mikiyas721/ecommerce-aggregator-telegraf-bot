import {TelegrafContext} from "../../../utils/telegraf_types/context_types";
import {CommonHandlers} from "../common_handlers";
import {isChannelMember} from "../../../../modules/user/util/user_helpers";
import * as console from "node:console";

export class CommonKeyboardHandlers {
    static async botToScenes(ctx: TelegrafContext) {
        return CommonHandlers.fromBotToScenes(ctx)
    }
}
