import {Either} from "../../../../common/utils/fp/f_p";
import {Failure, Success} from "../../../../common/utils/abstracts";

export interface ProductRepo {
    fetchProductById(productId: string): Promise<Either<Failure, Success<undefined | { id: string }>>>;

    fetchBundleById(productId: string): Promise<Either<Failure, Success<undefined | { id: string }>>>;
}
