import {Failure, ValueObject} from "../../../../common/utils/abstracts";
import {Either} from "../../../../common/utils/fp/f_p";

class EmptyPasswordFailure extends Failure {
    get messageLocaleKey(): string {
        return "user.vos.password.empty";
    }
}

class InvalidPasswordFailure extends Failure {
    get messageLocaleKey(): string {
        return "user.vos.password.invalid";
    }
}

const passwordRegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,15}$/

export class Password extends ValueObject<string> {
    private constructor(value: string) {
        super(value);
    }

    static create(password: string | undefined): Either<Failure, Password> {
        if (password == undefined) return Either.left(new EmptyPasswordFailure())
        if (passwordRegExp.test(password)) return Either.left(new InvalidPasswordFailure())
        return Either.right(new Password(password))
    }
}
