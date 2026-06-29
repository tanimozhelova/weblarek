import { IBuyer, TPayment, TBuyerErrors } from '../../types/index'

export class Customer {
  private payment: TPayment | '' = '';
  private address: string = '';
  private phone: string = '';
  private email: string = '';

  constructor() {}

  setField(field: keyof IBuyer, value: string): void {
    if (field === 'payment') {
      this[field] = value as TPayment;
    } else {
      this[field] = value;
    }
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
    this.payment = '';
    this.address = '';
    this.phone = '';
    this.email = '';
  }

  validateCustomerData(): TBuyerErrors {
    const errors: TBuyerErrors = {};

    if (!this.payment.trim()) {
      errors.payment = 'Укажите способ оплаты';
    }

    if (!this.address.trim()) {
      errors.address = 'Укажите адрес';
    }

    if (!this.phone.trim()) {
      errors.phone = 'Укажите телефон';
    }

    if (!this.email.trim()) {
      errors.email = 'Укажите емейл';
    }

    return errors;
  }
}