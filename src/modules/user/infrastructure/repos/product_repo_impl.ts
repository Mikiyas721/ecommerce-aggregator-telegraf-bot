import {ProductRepo} from "../../domain/ports/product_repo";
import {Either} from "../../../../common/utils/fp/f_p";
import {Failure, Success} from "../../../../common/utils/abstracts";
import {ProductRemoteDatasource} from "../datasources/product_remote_datasource";

export class ProductRepoImpl implements ProductRepo {
    constructor(private productRemoteDatasource: ProductRemoteDatasource) {
    }

    async fetchProductById(productId: string): Promise<Either<Failure, Success<undefined | { id: string }>>> {
        throw Error("Unimplemented")
    }

    async fetchBundleById(productId: string): Promise<Either<Failure, Success<undefined | { id: string }>>> {
        throw Error("Unimplemented")
    }
}
