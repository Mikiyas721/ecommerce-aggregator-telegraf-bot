export class RestRequest {
    constructor(
        public url: string,
        public headers?: any,
        public params?: any,
        public data?: any
    ) {
    }
}
