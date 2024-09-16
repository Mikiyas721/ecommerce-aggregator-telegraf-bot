import {provider, TelegrafContext, MyMarkup} from "telegraf-721";
import {dependencyKeys} from "../../../common/utils/constants";

export const UserReplyMarkups = {
    myWalletMenu(ctx: TelegrafContext) {
        return MyMarkup.getInlineKeyboardMarkup(ctx,[
            provider.get(dependencyKeys.walletWithdrawInlineKeyboard),
            provider.get(dependencyKeys.walletBackInlineKeyboard)
        ])
    }
}
