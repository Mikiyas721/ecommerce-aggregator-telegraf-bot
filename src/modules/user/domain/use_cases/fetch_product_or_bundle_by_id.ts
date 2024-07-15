import {ProductRepo} from "../ports/product_repo";

export class FetchProductOrBundleById {
    constructor(private productRepo: ProductRepo) {
    }

    execute(isProduct: boolean, productId: string) {
        return isProduct ?
            this.productRepo.fetchProductById(productId) :
            this.productRepo.fetchBundleById(productId)
    }
}
