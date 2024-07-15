import {injectCommonCommands} from "./presentation/interactives/commands/common_commands";
import {injectInfrastructure} from "./infrastructure/infrastructure.injection";
import {injectCommonKeyboards} from "./presentation/interactives/keyboards/common_keyboards";

const injectPresentation = () => {
    injectCommonKeyboards()
    injectCommonCommands()
}

export const injectCommonModule = () => {
    injectPresentation()
    injectInfrastructure()
}
