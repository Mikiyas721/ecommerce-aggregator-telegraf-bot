import {Either, Failure, ValueObject} from "telegraf-721";

export abstract class PasswordFailure extends Failure{}

class EmptyPasswordFailure extends PasswordFailure {
    get messageLocaleKey(): string {
        return "user.vos.password.empty";
    }
}

class InvalidPasswordFailure extends PasswordFailure {
    get messageLocaleKey(): string {
        return "user.vos.password.invalid";
    }
}

const passwordRegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,15}$/

export class Password extends ValueObject<string> {
    private constructor(value: string) {
        super(value);
    }

    static create(password: string | undefined): Either<PasswordFailure, Password> {
        if (password == undefined) return Either.left(new EmptyPasswordFailure())
        if (passwordRegExp.test(password)) return Either.left(new InvalidPasswordFailure())
        return Either.right(new Password(password))
    }
}
