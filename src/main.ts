import './scss/styles.scss';
import { Products } from './components/Models/Products';
import { Cart } from './components/Models/Cart';
import { Customer } from './components/Models/Customer';
import { ProductCatalogLoader } from './components/Services/ProductCatalogLoader';
import { apiProducts } from './utils/data';
import { Api } from './components/base/Api';
import { API_URL } from './utils/constants';
import { OrderRequest } from './types';

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

cartModel.deleteProduct(productToRemove);/*начало*/
const isProductInCart = cartModel.findProductInCart(productToRemove.id);
console.log(`Товар с id ${productToRemove.id} в корзине после удаления:`, isProductInCart);

cartModel.clearCart();
console.log('Корзина после очистки:', cartModel.getProductInCart());
console.log('Общее количество после очистки:', cartModel.getTotalProductCount());
console.log('Общая сумма после очистки:', cartModel.sumPrices());

const customerModel = new Customer();
console.log('Изначальные данные:', customerModel.getCustomerData());

console.log('Проверка с пустыми данными:');

customerModel.setField('payment', 'card');
console.log('Обновленные данные после payment:', customerModel.getCustomerData());

customerModel.setField('email', 'test@example.com');
console.log('Обновленные данные после email:', customerModel.getCustomerData());

customerModel.setField('address', 'ул. Новый Арбат, д. 1');
customerModel.setField('phone', '+71234567890');

console.log('Проверка с заполненными данными:');
const errorsFull = customerModel.validateCustomerData();
console.log(errorsFull);

const data = customerModel.getCustomerData();
console.log('Данные после обновления:', data);


const selectedItemsIds = [
  '854cef69-976d-4c2a-a18c-2aa45046c390',
  'c101ab44-ed99-4a54-990d-47aa2bb4e7d9'
];

selectedItemsIds.forEach(id => {
  const product = productsModel.getProductById(id);
  if (product) {
    cartModel.addProduct(product);
  }
});

const totalSum = cartModel.sumPrices();
console.log('Итоговая сумма выбранных товаров:', totalSum);


const api = new Api(API_URL);
const loader = new ProductCatalogLoader(api);

loader.fetchProductList()
  .then((response) => {
    productsModel.setProducts(response.items);
    console.log('Каталог с сервера:', productsModel.getProducts());
  })
  .catch((error) => {
    console.error('Ошибка при получении списка продуктов:', error);
  });

const testOrder: OrderRequest = {
  items: ['854cef69-976d-4c2a-a18c-2aa45046c390','c101ab44-ed99-4a54-990d-47aa2bb4e7d9'
  ],
  payment: 'card',
  email: 'test@example.com',
  phone: '+71234567890',
  address: 'ул. Новый Арбат, д. 1',
  total: totalSum
};

loader.submitOrder(testOrder)
  .then(orderResponse => {
    console.log('Ответ сервера на заказ:', orderResponse);
  })
  .catch(error => {
    console.error('Ошибка при отправке заказа:', error);
  });
