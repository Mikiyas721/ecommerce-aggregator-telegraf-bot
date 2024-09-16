import {CommonHandlers} from "../common_handlers";
import {TelegrafContext} from "telegraf-721"

export class CommonKeyboardHandlers {
    static async botToScenes(ctx: TelegrafContext) {
        return CommonHandlers.fromBotToScenes(ctx)
    }
}
