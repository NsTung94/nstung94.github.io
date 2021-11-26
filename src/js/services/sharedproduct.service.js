let _currentProducts = [];
let _cartProducts = [];
const _cartItemKey = '_cartItemKey';
let numberCartItem = document.querySelector('.js-number-cart');
export const allProducts = []
export async function fetchProducts(){
  try {
    const res = await fetch("src/product.json");
    let products = await res.json();
    products.map(product => {
      allProducts.push(product)
    })
    return products
    } catch (err) {
    console.log(err);
  }
}


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
  numberCartItem.innerText = itemsTotal;
}
