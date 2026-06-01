import { ApiPostMethods, ICatalogLoader, IApi, OrderRequest,
         OrderResponse, ProductListResponse } from "../../types";
import { API_ENDPOINTS } from "../../utils/constants";

export class ProductCatalogLoader implements ICatalogLoader {
    private api: IApi;

    constructor(api: IApi) {
      this.api = api;
    }

    fetchProductList(): Promise<ProductListResponse> {
      return this.api.get<ProductListResponse>(API_ENDPOINTS.PRODUCTS);
    }

    submitOrder(data: OrderRequest, method: ApiPostMethods = 'POST'): Promise<OrderResponse> {
      return this.api.post<OrderResponse>(API_ENDPOINTS.ORDER, data, method);
    }
}