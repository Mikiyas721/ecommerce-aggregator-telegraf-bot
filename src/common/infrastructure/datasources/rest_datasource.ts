import {RestDatasource} from "./rest_datasource/rest_datasource";
import {RestRequest} from "./rest_datasource/rest_request";
import {OtherRemoteRequestFailure, RestResponse, RestResponseFailure} from "./rest_datasource/rest_response";
import {Failure} from "../../utils/abstracts";
import {Either} from "../../utils/fp/f_p";
import axios, {AxiosInstance, AxiosResponse} from "axios";
import {Config} from "../../../config/config";

export class AxiosDatasource implements RestDatasource {
    private static instance: AxiosDatasource;
    private axios: AxiosInstance;

    private constructor(config: Config) {
        this.axios = axios.create({
            baseURL: config.apiBaseUrl,
            timeout: 30000,
            withCredentials: true
        });
        if (config.apiAccessToken) {
            this.axios.interceptors.request.use(function (request) {
                request.headers['Authorization'] = `${config.apiAccessToken}`
                return request;
            }, function (error: any) {
                return Promise.reject(error);
            });
        }
    }

    public static getInstance(config: Config): AxiosDatasource {
        if (!AxiosDatasource.instance) {
            AxiosDatasource.instance = new AxiosDatasource(config);
        }
        return AxiosDatasource.instance;
    }

    async request(request: Promise<AxiosResponse>): Promise<Either<RestResponseFailure, RestResponse>> {
        try {
            const response = await request;
            return Either.right(new RestResponse(response.data, response.status));
        } catch (e: any) {
            //const error = JSON.parse(JSON.stringify(e));
            return Either.left(new OtherRemoteRequestFailure(
                e?.response?.data?.error?.message || e.message || e.code,
                e?.response?.data?.error?.statusCode ?? e.status
            ));
        }
    }

    delete(request: RestRequest): Promise<Either<Failure, RestResponse>> {
        return this.request(this.axios.delete(request.url, {
            params: request.params,
            headers: request.headers
        }));
    }

    get(request: RestRequest): Promise<Either<RestResponseFailure, RestResponse>> {
        return this.request(this.axios.get(request.url, {
            params: request.params,
            headers: request.headers
        }));
    }

    patch(request: RestRequest): Promise<Either<Failure, RestResponse>> {
        return this.request(this.axios.patch(request.url, request.data, {
            params: request.params,
            headers: request.headers
        }));
    }

    post(request: RestRequest): Promise<Either<Failure, RestResponse>> {
        return this.request(this.axios.post(request.url, request.data, {
            params: request.params,
            headers: request.headers
        }));
    }

    put(request: RestRequest): Promise<Either<Failure, RestResponse>> {
        return this.request(this.axios.put(request.url, request.data, {
            params: request.params,
            headers: request.headers
        }));
    }
}
