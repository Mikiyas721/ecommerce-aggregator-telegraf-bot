import {TelegrafContext} from "../../../../../common/utils/telegraf_types/context_types";
import {sendUseOnlyButtonsBelowErrorMsg} from "../../../../../common/utils/common_helpers";
import {MyMarkup} from "../../../../../common/utils/telegraf_helper/my_markup";
import {provider} from "../../../../../injection";
import {dependencyKeys} from "../../../../../common/utils/constants";

export class MainMenuSceneHandlers {
    static async enter(ctx: TelegrafContext) {
        return ctx.replyWithHTML(
            ctx.i18n.t("mainMenu.msg.info.mainMenuInit"),
            MyMarkup.getKeyboardMarkup(ctx, [
                provider.get(dependencyKeys.inviteKeyboard),
                provider.get(dependencyKeys.myWalletKeyboard),
                provider.get(dependencyKeys.myOrdersKeyboard),
            ])
        )
    }

    static async mainMenu(ctx: TelegrafContext) {
        return sendUseOnlyButtonsBelowErrorMsg(ctx)
    }
}
