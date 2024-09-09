import {TelegrafContext} from "../../../../../common/utils/telegraf_types/context_types";
import {sceneKeys} from "../../../../../common/utils/constants";

export class FeedbackKeyboardHandlers {
    static async cancel(ctx: TelegrafContext) {
        return ctx.scene.enter(sceneKeys.mainMenu)
    }
}
