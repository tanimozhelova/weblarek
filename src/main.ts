import "./scss/styles";
import { Products } from './components/Models/Products';
import { Cart } from './components/Models/Cart';
import { Customer } from './components/Models/Customer';
import { ProductCatalogLoader } from './components/Services/ProductCatalogLoader';
import { apiProducts } from './utils/data';
import { Api } from './components/base/Api';
import { API_URL } from './utils/constants';
import { ProductListResponse, OrderRequest, OrderResponse } from './types';

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

console.log('Проверка с пустыми данными:');
const errorsEmpty = customerModel.validateCustomerData();
console.log(errorsEmpty);

const result1 = customerModel.setField('payment', 'Карта');
console.log('Обновление payment:', result1);

const result2 = customerModel.setField('email', 'test@example.com')
console.log('Обновление email:', result2);

customerModel.setField('address', 'ул. Новый Арбат, д. 1');
customerModel.setField('phone', '+71234567890');

console.log('Проверка с заполненными данными:');
const errorsFull = customerModel.validateCustomerData();
console.log(errorsFull);

const data = customerModel.getCustomerData();
console.log('Данные после обновления:', data);

const api = new Api(API_URL);
const loader = new ProductCatalogLoader(api);

loader.fetchProductList()
  .then(response => {
    console.log('Список товаров с сервера:', response);
  })
  .catch(error => {
    console.error('Ошибка при загрузке каталога:', error);
  });

const testOrder: OrderRequest = {
  items: ['854cef69-976d-4c2a-a18c-2aa45046c390',
          'c101ab44-ed99-4a54-990d-47aa2bb4e7d9'
  ],
  payment: 'card',
  email: 'test@example.com',
  phone: '+71234567890',
  address: 'ул. Новый Арбат, д. 1'
};

loader.submitOrder(testOrder)
  .then(orderResponse => {
    console.log('Ответ сервера на заказ:', orderResponse);
  })
  .catch(error => {
    console.error('Ошибка при отправке заказа:', error);
  });
