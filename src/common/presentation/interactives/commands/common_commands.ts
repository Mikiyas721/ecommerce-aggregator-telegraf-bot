import {provider, MyCommand} from "telegraf-721";
import {dependencyKeys} from "../../../utils/constants";
import {CommonCommandHandlers} from "../../handlers/commands/common_command_handlers";

export const injectCommonCommands = () => {
    provider.registerLazySingleton(
        dependencyKeys.startCommand,
        () => new MyCommand(
            "start",
            CommonCommandHandlers.start
        )
    )
    provider.registerLazySingleton(
        dependencyKeys.feedbackCommand,
        () => new MyCommand(
            "feedback",
            CommonCommandHandlers.feedback
        )
    )
}
