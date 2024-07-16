import {Failure, ValueObject} from "../../../../common/utils/abstracts";
import {Either} from "../../../../common/utils/fp/f_p";

export abstract class NoteFailure extends Failure {
}

class EmptyNoteFailure extends NoteFailure {
    get messageLocaleKey(): string {
        return "order.vos.note.empty";
    }
}


export class Note extends ValueObject {
    private constructor(value: string) {
        super(value);
    }

    static create(deliveryAddress: string | undefined): Either<NoteFailure, Note> {
        if (deliveryAddress == undefined || deliveryAddress == "")
            return Either.left(new EmptyNoteFailure())

        return Either.right(new Note(deliveryAddress))
    }
}
