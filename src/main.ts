import './scss/styles.scss';
import { Products } from './components/Models/Products';
import { Cart } from './components/Models/Cart';
import { Customer } from './components/Models/Customer';
import { apiProducts } from './utils/data';

const productsModel = new Products();
productsModel.setProducts(apiProducts.items);
console.log('Массив товаров из каталога:', productsModel.getProducts());

const firstProductId = apiProducts.items[0].id;
console.log('Поиск товара по ID:', firstProductId, 
productsModel.getProductById(firstProductId));

productsModel.setProductById(firstProductId);
console.log('Активный товар после установки:', productsModel.getActiveProduct());

productsModel.setProductById('nonexistent-id');
console.log('Активный товар после установки несуществующего ID:', productsModel.getActiveProduct());

const cartModel = new Cart();
console.log('Изначальная корзина:', cartModel.getProductInCart());

apiProducts.items.forEach(product => cartModel.addProduct(product));
console.log('После добавления товаров:', cartModel.getProductInCart());
console.log('Общее число товаров:', cartModel.getTotalProductCount());
console.log('Общая сумма:', cartModel.sumPrices());


console.log(`Есть ли товар ${firstProductId}:`, cartModel.findProductInCart(firstProductId));

const productToRemove = apiProducts.items[0];
const success = cartModel.deleteProduct(productToRemove);
console.log(`Удаление товара ${productToRemove.id}:`, success);
console.log('Корзина после удаления:', cartModel.getProductInCart());
console.log('Общая сумма после удаления:', cartModel.sumPrices());

cartModel.clearCart();
console.log('Корзина после очистки:', cartModel.getProductInCart());
console.log('Общее количество после очистки:', cartModel.getTotalProductCount());
console.log('Общая сумма после очистки:', cartModel.sumPrices());

const customerModel = new Customer();
console.log('Изначальные данные:', customerModel.getCustomerData());

const result1 = customerModel.setCustomerData('payment', 'Карта');
console.log('Обновление payment:', result1);

const result2 = customerModel.setCustomerData('email', 'test@example.com')
console.log('Обновление email:', result2);

const data = customerModel.getCustomerData();
console.log('Данные после обновления:', data);



