import {Option, Entity} from "telegraf-721";
import {FeedbackBody} from "../value_objects/feedback_body";

export class Feedback extends Entity {
    private constructor(
        id: string | undefined,
        readonly body: FeedbackBody,
        readonly userId: string,
    ) {
        super(id);
    }

    static createFromUnvalidated(
        id: string | undefined,
        body: string,
        userId: string,
    ): Option<Feedback> {
        if (!id) return Option.none()

        const feedbackBodyObject = FeedbackBody.create(body)
        if (feedbackBodyObject.isLeft) return Option.none()

        return Option.some(new Feedback(
            id,
            feedbackBodyObject.getRight()!,
            userId
        ))
    }

    static createFromValidated(
        body: string,
        userId: string,
    ): Feedback {
        const feedbackBodyObject = FeedbackBody.create(body)

        return new Feedback(
            undefined,
            feedbackBodyObject.getRight()!,
            userId
        )
    }
}
