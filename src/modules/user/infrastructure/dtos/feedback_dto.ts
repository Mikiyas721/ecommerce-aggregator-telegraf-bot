import {IdDto} from "../../../../common/infrastructure/datasources/dto/dto";
import {Option} from "telegraf-721";
import {Feedback} from "../../domain/entities/feedback";

export class FeedbackDto extends IdDto<Feedback> {
    constructor(
        id: string | undefined,
        readonly body: string,
        readonly userId: string,
    ) {
        super(id);
    }

    toDomain(): Option<Feedback> {
        return Feedback.createFromUnvalidated(
            this.id,
            this.body,
            this.userId
        );
    }

    static fromJson(json: any) {
        return new FeedbackDto(
            json.id,
            json.body,
            json.userId
        )
    }

    static fromDomain(feedback: Feedback) {
        return new FeedbackDto(
            feedback.id,
            feedback.body.value,
            feedback.userId,
        )
    }
}
