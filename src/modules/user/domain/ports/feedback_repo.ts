import {Feedback} from "../entities/feedback";
import {Either, Failure} from "telegraf-721";

export interface FeedbackRepo {
    addFeedback(feedback: Feedback): Promise<Either<Failure, Feedback>>
}
