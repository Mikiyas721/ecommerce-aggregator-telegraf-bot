import {sendUseOnlyButtonsBelowErrorMsg} from "../../../../../common/utils/common_helpers";
import {provider, TelegrafContext, MyMarkup} from "telegraf-721";
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
