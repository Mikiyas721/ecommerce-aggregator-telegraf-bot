import {Either, Failure, ValueObject} from "telegraf-721";

export abstract class NameFailure extends Failure {
}

class EmptyFirstNameFailure extends NameFailure {
    get messageLocaleKey(): string {
        return "user.vos.name.emptyFirstName";
    }
}

class EmptyLastNameFailure extends NameFailure {
    get messageLocaleKey(): string {
        return "user.vos.name.emptyLastName";
    }
}

class TwoWordFirstNameFailure extends NameFailure {
    get messageLocaleKey(): string {
        return "user.vos.name.twoWordFirstName";
    }
}

class TwoWordLastNameFailure extends NameFailure {
    get messageLocaleKey(): string {
        return "user.vos.name.twoWordLastName";
    }
}

class LongNameFailure extends NameFailure {
    get messageLocaleKey(): string {
        return "user.vos.name.longName";
    }
}

class InvalidFirstNameFailure extends NameFailure {
    get messageLocaleKey(): string {
        return "user.vos.name.ivdFirstName";
    }
}

class InvalidLastNameFailure extends NameFailure {
    get messageLocaleKey(): string {
        return "user.vos.name.ivdLastName";
    }
}

const englishWordRegExp = /^[a-z|A-Z]+$/
const amharicWordRegExp = /^[\u1200-\u137F]+$/

export class Name extends ValueObject {
    private constructor(value: string) {
        super(value);
    }

    static createForFirstName(name: string|undefined): Either<NameFailure, Name> {
        if (name == undefined || name == "") return Either.left(new EmptyFirstNameFailure())
        if (name.includes(" ")) return Either.left(new TwoWordFirstNameFailure())
        if (!englishWordRegExp.test(name) && !amharicWordRegExp.test(name)) return Either.left(new InvalidFirstNameFailure())
        if (name.length > 30) return Either.left(new LongNameFailure())
        return Either.right(new Name(name))
    }

    static createForLastName(name: string|undefined): Either<NameFailure, Name> {
        if (name == undefined || name == "") return Either.left(new EmptyLastNameFailure())
        if (name.includes(" ")) return Either.left(new TwoWordLastNameFailure())
        if (!englishWordRegExp.test(name) && !amharicWordRegExp.test(name)) return Either.left(new InvalidLastNameFailure())
        if (name.length > 30) return Either.left(new LongNameFailure())
        return Either.right(new Name(name))
    }
}
