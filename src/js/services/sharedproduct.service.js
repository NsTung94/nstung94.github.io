let _currentProducts = [];
let _cartProducts = [];
const _cartItemKey = '_cartItemKey';
let numberCartItem = document.querySelector('.js-number-cart');
export let allProducts = []
export let productsCount = 0;

export async function fetchProducts(){
  try {
    const res = await fetch("src/product.json");
    allProducts = await res.json();
    productsCount = allProducts.length;
    return allProducts
    } catch (err) {
    console.log(err);
  }
}


export function saveProducts(products) {
  _currentProducts = [..._currentProducts, ...products];
}

export function getCurrentProducts() {
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

// get products according to pageIndex & paseSize
export function getProducts(startIndex = 0, pageSize = 3){
  const lastIndex = startIndex + pageSize;
  const loadedProducts = allProducts.slice(startIndex, lastIndex);
  return loadedProducts;
}

