import {Either} from "../../../utils/fp/f_p";
import {Failure} from "../../../utils/abstracts";
import {RestRequest} from "./rest_request";
import {RestResponse, RestResponseFailure} from "./rest_response";

export interface RestDatasource {
    get(request: RestRequest): Promise<Either<RestResponseFailure, RestResponse>>

    post(request: RestRequest): Promise<Either<Failure, RestResponse>>

    put(request: RestRequest): Promise<Either<Failure, RestResponse>>

    patch(request: RestRequest): Promise<Either<Failure, RestResponse>>

    delete(request: RestRequest): Promise<Either<Failure, RestResponse>>
}
