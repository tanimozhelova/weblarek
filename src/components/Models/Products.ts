
export class Products { 
    private allProducts: Product[] = [];
    private activeProductId: string | null = null;

    constructor() {   
    }

    setProducts(items: IProduct[]): void {
      this.allProducts = items;
    }

    getProducts(): Product[] {
      return this.allProducts;
    }

    setProductById(productId: string): void {
      if (this.getProductById(productId)) {
        this.activeProductId = productId;
      } else {
        this.activeProductId = null;
      }
    }

    getProductById(productId: string): Product | null {
    return this.allProducts.find((product) => product.id === productId) ?? null;
    }

    getActiveProduct(): Product | null {
    if (this.activeProductId) {
      return this.getProductById(this.activeProductId);
    }
    return null;
  }
}    