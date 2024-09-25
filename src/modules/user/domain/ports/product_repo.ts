import {Either, Failure} from "telegraf-721";

export interface ProductRepo {
    fetchProductById(productId: string): Promise<Either<Failure, undefined | { id: string }>>;

    fetchBundleById(productId: string): Promise<Either<Failure, undefined | { id: string }>>;
}
