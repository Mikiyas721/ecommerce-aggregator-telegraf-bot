import {TelegrafContext} from "../../../common/utils/telegraf_types/context_types";
import {MyMarkup} from "../../../common/utils/telegraf_helper/my_markup";
import {provider} from "telegraf-721";
import {dependencyKeys} from "../../../common/utils/constants";

export const UserReplyMarkups = {
    myWalletMenu(ctx: TelegrafContext) {
        return MyMarkup.getInlineKeyboardMarkup(ctx,[
            provider.get(dependencyKeys.walletWithdrawInlineKeyboard),
            provider.get(dependencyKeys.walletBackInlineKeyboard)
        ])
    }
}
