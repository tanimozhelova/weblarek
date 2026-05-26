
export class Customer {
    payment: string | null = null;
    address: string | null = null;
    phone: string | null = null;
    email: string | null = null;

    constructor() {
    }

    setCustomerData(key: keyof IBuyer, value: string | null): boolean {
      if (key in this) {
        (this as any)[key] = value;
        return true;
      }
      return false;
    }


    getCustomerData(): IBuyer {
       return {
         payment: this.payment,
         address: this.address,
         phone: this.phone,
         email: this.email,
        };
    }

    clearCustomerData(): void {
       this.payment = null;
       this.address = null;
       this.phone = null;
       this.email = null;
    }

    validateCustomerData(): { [key: string]: string } {
    const errors: { [key: string]: string } = {};

    if (!this.payment?.trim()) errors['payment'] = 'Укажите способ оплаты';
    if (!this.address?.trim()) errors['address'] = 'Укажите адрес';
    if (!this.phone?.trim()) errors['phone'] = 'Укажите телефон';
    if (!this.email?.trim()) errors['email'] = 'Укажите емейл';

    return errors;
  }
}