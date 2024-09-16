import {injectConfigModule} from "./config/config.injection";
import {injectMainStage} from "./common/presentation/stages/core_stage";
import {injectCommonModule} from "./common/common.injection";
import {injectUserModule} from "./modules/user/user.injection";
import {injectOrderModule} from "./modules/order/order.injection";
import {injectMainMenuModule} from "./modules/mainMenu/main_menu.injection";

export const injectDependencies = async () => {
    injectConfigModule()
    injectCommonModule()
    injectOrderModule()
    injectUserModule()
    injectMainMenuModule()
    injectMainStage()
}
