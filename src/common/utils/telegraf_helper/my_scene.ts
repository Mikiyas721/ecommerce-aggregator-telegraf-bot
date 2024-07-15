import {Context, Scenes} from "telegraf";
import {MyCallbackInlineKeyboard} from "./my_inline_keyboard";
import {HandledKeyboard} from "./my_keyboard";
import {MyCommand} from "./my_command";
import {Translator} from "../../../modules/localization/translator";
import {handlerFactory} from "../common_helpers";

export interface MyContext extends Context {
    scene: Scenes.SceneContextScene<this, Scenes.WizardSessionData>;
    wizard: Scenes.WizardContextWizard<this>;
    i18n: Translator;
    session: Scenes.WizardSession;
}

//@ts-ignore
export class MyScene extends Scenes.WizardScene<any> {
    constructor(
        id: string,
        handlers: {
            //Can not be Empty
            steps: any,
            enter?: any,
            leave?: any
        },
        interactors?: {
            keyboards?: HandledKeyboard[],
            inlineKeyboards?: MyCallbackInlineKeyboard[],
            commands?: MyCommand[],
        }
    ) {
        //@ts-ignore
        super(id, ...handlers.steps.map((handler, index) => {
            return handlerFactory({
                logLabel: `${id}Scene - Step${index}Handler |*| Function Name ${handler.name}`,
                handler: handler
            })
        }))

        if (handlers.enter) {
            this.enter(handlerFactory({
                logLabel: `${this.id}SceneEnterHandler`,
                handler: handlers.enter
            }))
        }

        if (handlers.leave) {
            this.leave(handlerFactory({
                logLabel: `${this.id}SceneLeaveHandler`,
                handler: handlers.leave
            }))
            this.leave(handlers.leave)
        }

        interactors?.keyboards?.forEach((e) => {
            this.hears(
                e.key,
                handlerFactory({
                    logLabel: `${this.id}Scene|([LBL]${e.logLabel})KeyboardHandler |*| Function Name ${e.handler.name}`,
                    handler: e.handler
                }) as any
            )
        })
        interactors?.inlineKeyboards?.forEach((e) => {
            this.action(
                e.key,
                handlerFactory({
                    logLabel: `${this.id}Scene|([LBL]${e.logLabel})-([CB]${e.callbackData})InlineKeyboardHandler |*| Function Name ${e.handler.name}`,
                    handler: e.handler
                })
            )
        })
        interactors?.commands?.forEach((e) => {
            this.command(
                e.command,
                handlerFactory({
                    logLabel: `${this.id}Scene|(${e.command})CommandHandler |*| Function Name ${e.handler.name}`,
                    handler: e.handler
                })
            )
        })
    }
}
