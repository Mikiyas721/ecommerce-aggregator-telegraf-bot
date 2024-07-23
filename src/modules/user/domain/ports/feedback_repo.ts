import {Feedback} from "../entities/feedback";
import {Either} from "../../../../common/utils/fp/f_p";
import {Failure} from "../../../../common/utils/abstracts";

export interface FeedbackRepo {
    addFeedback(feedback: Feedback): Promise<Either<Failure, Feedback>>
}
