import {provider} from "../../../../injection";
import {dependencyKeys, sceneKeys} from "../../../../common/utils/constants";
import {MyScene} from "../../../../common/utils/telegraf_helper/my_scene";
import {OrderSceneHandlers} from "../handlers/scene/order_scene_handlers";

export const injectOrderScenes = () => {
    provider.registerLazySingleton(
        dependencyKeys.orderScene,
        () => new MyScene(
            sceneKeys.order,
            {
                enter: OrderSceneHandlers.enter,
                steps: [
                    OrderSceneHandlers.deliveryDate,
                    OrderSceneHandlers.deliveryAddress,
                    OrderSceneHandlers.note,
                ]
            }, {
                keyboards: [
                    provider.get(dependencyKeys.cancelOrderKeyboard),
                    provider.get(dependencyKeys.skipOrderFieldKeyboard)
                ],
                inlineKeyboards: [],
                commands: [
                    provider.get(dependencyKeys.startCommand)
                ]
            }
        )
    )
}
