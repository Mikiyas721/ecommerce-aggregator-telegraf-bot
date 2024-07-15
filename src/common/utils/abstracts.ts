import {Left, Right} from "./fp/f_p";

export abstract class Failure extends Left {
    constructor(protected message: string | undefined = undefined) {
        super();
    }

    abstract get messageLocaleKey(): string
}

export abstract class ValueObject<T = string> extends Right {
    protected constructor(public value: T) {
        super();
    }
}

export abstract class ValueObjectCollection extends Right {
    protected constructor() {
        super();
    }
}

export class Success<T> extends Right{
    constructor(public value: T) {
        super();
    }
}

export class ValuelessSuccess extends Right{
    constructor() {
        super();
    }
}
