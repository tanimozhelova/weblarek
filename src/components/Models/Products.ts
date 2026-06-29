
import { IProduct } from '../../types/index';
export class Products { 
    private allProducts: IProduct[] = [];
    private activeProductId: string | null = null;

    constructor() {   
    }

    setProducts(items: IProduct[]): void {
      this.allProducts = items;
    }

    getProducts(): IProduct[] {
      return this.allProducts;
    }

    setProductById(productId: string): void {
      if (this.getProductById(productId)) {
        this.activeProductId = productId;
      } else {
        this.activeProductId = null;
      }
    }

    getProductById(productId: string): IProduct | null {
    return this.allProducts.find((product) => product.id === productId) ?? null;
    }

    getActiveProduct(): IProduct | null {
    if (this.activeProductId) {
      return this.getProductById(this.activeProductId);
    }
    return null;
  }
}    