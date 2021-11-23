let _currentProducts = [];
let _cartProducts = [];
const _cartItemKey = '_cartItemKey';

export function saveProducts(products) {
  _currentProducts = [..._currentProducts, ...products];
}

export function getProducts() {
  return _currentProducts;
}

export function updateCartProduct(products){
  _cartProducts = [...products];
  saveToCartProducts(_cartProducts);
}

export function saveToCartProducts(item){
  localStorage.setItem(_cartItemKey, JSON.stringify(item));
}

export function getCartProducts(){
  return localStorage.getItem(_cartItemKey)
    ? JSON.parse(localStorage.getItem(_cartItemKey))
    : [];
}