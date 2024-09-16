import {TelegrafContext} from "telegraf-721";
import {sceneKeys} from "../../../../../common/utils/constants";

export class FeedbackKeyboardHandlers {
    static async cancel(ctx: TelegrafContext) {
        return ctx.scene.enter(sceneKeys.mainMenu)
    }
}
