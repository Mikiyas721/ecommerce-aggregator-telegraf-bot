import {Failure, ValueObject} from "../../../../common/utils/abstracts";
import {Either} from "../../../../common/utils/fp/f_p";

abstract class FeedbackBodyFailure extends Failure {
}

class EmptyFeedbackBodyFailure extends FeedbackBodyFailure {
    get messageLocaleKey(): string {
        return "user.vos.feedbackBody.empty";
    }
}

class ShortFeedbackFailure extends FeedbackBodyFailure {
    get messageLocaleKey(): string {
        return "user.vos.feedbackBody.short";
    }
}

export class FeedbackBody extends ValueObject<string> {
    private constructor(value: string) {
        super(value);
    }

    static create(feedbackBody: string | undefined): Either<FeedbackBodyFailure, FeedbackBody> {
        if (feedbackBody == undefined) return Either.left(new EmptyFeedbackBodyFailure())
        if (feedbackBody.length < 10) return Either.left(new ShortFeedbackFailure())
        return Either.right(new FeedbackBody(feedbackBody))
    }
}
