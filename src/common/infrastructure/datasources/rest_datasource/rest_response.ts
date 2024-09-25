import {Failure} from "telegraf-721";

class RestResponseError {
    constructor(
        public statusCode: number,
        public message: string,
        public extra: any
    ) {
    }

    toString() {
        return `RestResponseError\n statusCode: ${this.statusCode}\n message: ${this.message}\n extra: ${this.extra}`;
    }
}

export abstract class RestResponseFailure extends Failure {
    constructor(
        message: string,
        public statusCode: number
    ) {
        super(message);
    }
}

/*class ConnectionFailure extends RestResponseFailure {
  constructor() {
    super("Connection Failure");
  }
}

class InvalidDataFailure extends RestResponseFailure {
  constructor() {
    super("Invalid Data Failure");
  }
}*/

export class OtherRemoteRequestFailure extends RestResponseFailure {
    constructor(
        message: string,
        statusCode: number
    ) {
        super(message, statusCode);
    }

    get messageLocaleKey(): string {
        return this.message!;
    }
}

export class RestResponse {
    constructor(
        public value: any,
        public statusCode: number
    ) {
    }
}
