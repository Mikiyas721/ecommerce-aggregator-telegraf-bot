import {provider} from "../../../../injection";
import {dependencyKeys, sceneKeys} from "../../../../common/utils/constants";
import {MyScene} from "../../../../common/utils/telegraf_helper/my_scene";
import {FeedbackSceneHandlers} from "../handlers/scene/feedback_scene_handlers";

export const injectFeedbackScene = () => {
    provider.registerLazySingleton(
        dependencyKeys.feedbackScene,
        () => new MyScene(
            sceneKeys.feedback,
            {
                enter: FeedbackSceneHandlers.enter,
                steps: [
                    FeedbackSceneHandlers.body,
                    FeedbackSceneHandlers.confirmOrDecline
                ]
            },
            {
                keyboards: [
                    provider.get(dependencyKeys.cancelFeedbackKeyboard)
                ],
                inlineKeyboards: [
                    provider.get(dependencyKeys.cancelFeedbackInlineKeyboard),
                    provider.get(dependencyKeys.confirmFeedbackInlineKeyboard),
                    provider.get(dependencyKeys.editFeedbackInlineKeyboard)
                ]
            }
        ))
}
