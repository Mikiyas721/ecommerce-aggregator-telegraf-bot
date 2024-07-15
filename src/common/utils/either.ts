import {Failure} from "./abstracts";
import {Right} from "./fp/f_p";
import {AxiosResponse} from "axios";

export class HttpRequestFailure extends Failure {
    constructor(message: string) {
        super(message);
    }

    get messageLocaleKey(): string {
        return this.message as string;
    }
}

export class SimpleFailure extends Failure {
    constructor(message: string) {
        super(message);
    }

    get messageLocaleKey(): string {
        return this.message as string;
    }
}

export class MyAxiosResponse<T> extends Right {
    constructor(public axiosResponse: AxiosResponse<T>) {
        super();
    }
}

export class MyResult<T> extends Right{
    constructor(public value: T) {
        super();
    }
}
