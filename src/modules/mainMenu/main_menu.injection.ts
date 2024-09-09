import {injectMainMenuScenes} from "./presentation/scenes/main_menu_scene";
import {injectMainMenuCommands} from "./presentation/interactives/commands/main_menu_commands";
import {injectMainMenuInlineKeyboards} from "./presentation/interactives/inline_keyboard/main_menu_inline_keyboards";
import {injectMainMenuKeyboards} from "./presentation/interactives/keyboard/main_menu_keybords";

const injectPresentation = () => {
    injectMainMenuInlineKeyboards()
    injectMainMenuCommands()
    injectMainMenuKeyboards()
    injectMainMenuScenes()
}

export const injectMainMenuModule = () => {
    injectPresentation()
}
