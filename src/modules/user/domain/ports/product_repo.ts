import {Either, Failure, Success} from "telegraf-721";

export interface ProductRepo {
    fetchProductById(productId: string): Promise<Either<Failure, Success<undefined | { id: string }>>>;

    fetchBundleById(productId: string): Promise<Either<Failure, Success<undefined | { id: string }>>>;
}
