export class Cart {
    private productsInCart: Product[] = [];

    constructor() {
    }

    getProductInCart(): Product[] {
        return this.productsInCart;
    }

    addProduct(product: Product): void {
        this.productsInCart.push(product);
    }

    deleteProduct(product: Product): boolean {
        const index = this.productsInCart.findIndex((item) => item.id === product.id);
          if (index !== -1) {
          this.productsInCart.splice(index, 1);
          return true;
        }
        return false;
    }

    clearCart(): void {
        if (this.productsInCart.length === 0) {
           return;
        }
        this.productsInCart = [];
    }

    sumPrices(): number {
        let total = 0;
          for (const item of this.productsInCart) {
          total += item.price ?? 0;
        }
        return total;
    }

    getTotalProductCount(): number {
        return this.productsInCart.length;
    }

    findProductInCart(productId: string): boolean {
        return this.productsInCart.some((item) => item.id === productId);
    }
}