export type ApiPostMethods = 'POST' | 'PUT' | 'DELETE';

export interface IApi {
    get<T extends object>(uri: string): Promise<T>;
    post<T extends object>(uri: string, data: object, method?: ApiPostMethods): Promise<T>;
}

export type PaymentMethod = 'credit_card' | 'pay_pal' | 'bank_transfer' | 'cash' | null;

export interface IProduct {
  id: string;
  description: string;
  image: string;
  title: string;
  category: string;
  price: number | null;
}

export interface IBuyer {
  payment: PaymentMethod;
  email: string;
  phone: string;
  address: string;
}

export interface ProductApiResponse {
  products: IProduct[];
}

export interface OrderRequestData {
  products: { id: string; quantity: number }[];
  buyer: IBuyer;
}

export interface OrderResponse {
  confirmation: string;
  total: number;
}