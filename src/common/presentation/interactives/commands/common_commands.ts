import {provider} from "telegraf-721";
import {dependencyKeys} from "../../../utils/constants";
import {MyCommand} from "../../../utils/telegraf_helper/my_command";
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
