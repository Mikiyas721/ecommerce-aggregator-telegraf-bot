import {Markup} from "telegraf";
import {
    MyCallbackInlineKeyboard,
    MyCoreCallbackInlineKeyboard,
    MyInlineKeyboard,
    MyUrlInlineKeyboard, MyWebAppInlineKeyboard
} from "./my_inline_keyboard";
import {
    MyExtraFunctionKeyboard,
    MyKeyboard,
    MyLabeledOnlyKeyboard,
    MyLabelPatternKeyboard
} from "./my_keyboard";
import {TelegrafContext} from "../telegraf_types/context_types";
import {ExtraReplyMessage} from "../telegraf_types/telegram_types";

export interface ButtonLayout {
    countInRow?: number,
    actual?: number[]
}

export class MyMarkup {
    private static getInlineKeyboardObject(ctx: TelegrafContext, myInlineKeyboard: MyInlineKeyboard) {
        if (myInlineKeyboard instanceof MyCallbackInlineKeyboard) {
            if (
                myInlineKeyboard instanceof MyCoreCallbackInlineKeyboard &&
                myInlineKeyboard.dataPattern && !myInlineKeyboard.data
            ) {
                throw new Error("MyCoreCallbackInlineKeyboard is registered wth dataPattern but is missing data")
            }
            return Markup.button.callback(
                myInlineKeyboard.isTranslated ?
                    myInlineKeyboard.getLocalizationKey :
                    ctx.i18n.t(myInlineKeyboard.getLocalizationKey),
                myInlineKeyboard.callbackData
            )
        } else if (myInlineKeyboard instanceof MyUrlInlineKeyboard) {
            return Markup.button.url(
                myInlineKeyboard.isTranslated ?
                    myInlineKeyboard.getLocalizationKey :
                    ctx.i18n.t(myInlineKeyboard.getLocalizationKey),
                myInlineKeyboard.getUrl
            )
        }
        else if (myInlineKeyboard instanceof MyWebAppInlineKeyboard) {
            return Markup.button.webApp(
                myInlineKeyboard.isTranslated ?
                    myInlineKeyboard.getLocalizationKey :
                    ctx.i18n.t(myInlineKeyboard.getLocalizationKey),
                myInlineKeyboard.getUrl
            )
        }
        throw Error("Unknown instance of sub type MyInlineKeyboard")
    }

    private static getKeyboardObject(ctx: TelegrafContext, myKeyboard: MyKeyboard) {
        if (myKeyboard instanceof MyLabeledOnlyKeyboard || myKeyboard instanceof MyLabelPatternKeyboard) {
            return Markup.button.text(myKeyboard.localizationKey)
        }
        if (myKeyboard instanceof MyExtraFunctionKeyboard) {
            if (myKeyboard.config.requestContact)
                return Markup.button.contactRequest(ctx.i18n.t(myKeyboard.localizationKey))
            else if (myKeyboard.config.requestLocation)
                return Markup.button.locationRequest(ctx.i18n.t(myKeyboard.localizationKey))
        }
        return Markup.button.text(ctx.i18n.t(myKeyboard.localizationKey))
    }

    /**
     * layout.actual is given priority over layout.countInRow
     * */
    static getInlineKeyboardMarkup(ctx: TelegrafContext, myInlineKeyboards: MyInlineKeyboard[], layout?: ButtonLayout) {
        const buttons = []
        for (let itemsInRow of layout?.actual ?? this.getLayout(myInlineKeyboards.length, layout?.countInRow)) {
            let row = []
            for (let i = 0; i < itemsInRow; i++) {
                row.push(MyMarkup.getInlineKeyboardObject(ctx, myInlineKeyboards[0]))
                myInlineKeyboards.shift()
            }
            buttons.push(row)
        }
        return Markup.inlineKeyboard(buttons)
    }

    /**
     * layout.actual is given priority over layout.countInRow
     * */
    static getKeyboardMarkup(ctx: TelegrafContext, myKeyboards: MyKeyboard[], layout?: ButtonLayout): ExtraReplyMessage {
        const buttons = []
        for (let itemsInRow of layout?.actual ?? this.getLayout(myKeyboards.length, layout?.countInRow)) {
            let row = []
            for (let i = 0; i < itemsInRow; i++) {
                if (myKeyboards.length == 0) break
                row.push(MyMarkup.getKeyboardObject(ctx, myKeyboards[0]))
                myKeyboards.shift()
            }
            buttons.push(row)
        }
        return Markup.keyboard(buttons as any)
            .resize()
            .persistent() as ExtraReplyMessage
            /*.placeholder(ctx.i18n.t("common.msg.pmt.textFieldPromptMsg"))*/
    }

    private static getLayout(listLength: number, countInRow: number = 2) {
        const layout = []
        for (let i = 0; i < Math.floor(listLength / countInRow); i++) {
            layout.push(countInRow)
        }
        //Items that remain and are less than countInRow
        const remaining = listLength % countInRow
        if (remaining != 0) layout.push(remaining)
        return layout
    }
}
