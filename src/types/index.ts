export type ApiPostMethods = 'POST' | 'PUT' | 'DELETE';
export type TBuyerErrors = Partial<Record<keyof IBuyer, string>>;

export interface IApi {
    get<T extends object>(uri: string): Promise<T>;
    post<T extends object>(uri: string, data: object, method?: ApiPostMethods): Promise<T>;
}

export type TPayment = 'card' | 'cash' | '';

export interface IProduct {
  id: string;
  description: string;
  image: string;
  title: string;
  category: string;
  price: number | null;
}

export interface IBuyer {
  payment: TPayment;
  email: string;
  phone: string;
  address: string;
}

export interface ICatalogLoader {
  fetchProductList(): Promise<ProductListResponse>;
  submitOrder(data: OrderRequest, method?: ApiPostMethods): Promise<OrderResponse>;
}

export interface ProductListResponse {
  total: number;
  items: IProduct[];
}

export interface OrderRequest extends IBuyer {
  items: string[];
}

export interface OrderResponse {
  id: string;
  total: number;
}