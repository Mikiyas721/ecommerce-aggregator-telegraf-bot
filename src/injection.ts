import {DependencyProvider} from "./common/utils/dependency_provider";
import {injectConfigModule} from "./config/config.injection";
import {injectLocalizationModule} from "./modules/localization/localization.injection";
import {injectMainStage} from "./common/presentation/stages/core_stage";
import {injectCommonModule} from "./common/common.injection";
import {injectUserModule} from "./modules/user/user.injection";

export const provider = DependencyProvider.getInstance;

export const injectDependencies = async () => {
    injectConfigModule()
    injectLocalizationModule()
    injectCommonModule()
    injectUserModule()
    injectMainStage()
}
