import {FeedbackRepo} from "../ports/feedback_repo";
import {Feedback} from "../entities/feedback";

export class AddFeedback {
    constructor(private feedbackRepo: FeedbackRepo) {
    }

    execute(feedback: Feedback) {
        return this.feedbackRepo.addFeedback(feedback)
    }
}
