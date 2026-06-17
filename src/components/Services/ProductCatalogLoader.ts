import { ICatalogLoader, IApi, OrderRequest, OrderResponse, ProductListResponse } from "../../types";

export class ProductCatalogLoader implements ICatalogLoader {
    private api: IApi;

    constructor(api: IApi) {
      this.api = api;
    }

    fetchProductList(): Promise<ProductListResponse> {
      return this.api.get<ProductListResponse>('/product/');
    }

    submitOrder(data: OrderRequest): Promise<OrderResponse> {
      return this.api.post<OrderResponse>('/order/', data);
    }
}