import {FeedbackRepo} from "../../domain/ports/feedback_repo";
import {FeedbackRemoteDatasource} from "../datasources/feedback_remote_datasource";
import {Feedback} from "../../domain/entities/feedback";
import {Either, Failure, SimpleFailure} from "telegraf-721";
import {FeedbackDto} from "../dtos/feedback_dto";

export class FeedbackRepoImpl implements FeedbackRepo {
    constructor(private feedbackRemoteDatasource: FeedbackRemoteDatasource) {
    }

    async addFeedback(feedback: Feedback): Promise<Either<Failure, Feedback>> {
        const usersResponse = await this.feedbackRemoteDatasource.restDatasource.post({
            url: `${this.feedbackRemoteDatasource.myPath}`,
            data: FeedbackDto.fromDomain(feedback).toJson()
        });

        return usersResponse.fold(
            l => Either.left(l),
            r => FeedbackDto.fromJson(r.value).toDomain().fold(
                () => Either.left(new SimpleFailure("Unable to map dto to domain")),
                s => Either.right(s)
            )
        );
    }
}
