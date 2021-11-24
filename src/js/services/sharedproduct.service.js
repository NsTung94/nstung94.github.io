let _currentProducts = [];
let _cartProducts = [];
const _cartItemKey = '_cartItemKey';
let numberCartItem = document.querySelector('.js-number-cart');

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

export function setCartValues(cart) {
  let itemsTotal = 0;
  cart.map(item => {
    itemsTotal += item.cartQuantity;
  });
  // if (itemsTotal === 0){
    
  // }
  numberCartItem.innerText = itemsTotal;
}
