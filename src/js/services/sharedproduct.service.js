let _currentProducts = [];
let _cartProducts = [];
const _cartItemKey = '_cartItemKey';
let numberCartItem = document.querySelector('.js-number-cart');

class ProductServices {
  allProducts = [];
  productsCount = 0;
  async fetchProducts(){
    try {
      const res = await fetch("src/product.json");
      this.allProducts = await res.json();
      this.productsCount = this.allProducts.length;
      return this.allProducts
      } catch (err) {
      console.log(err);
    }
  }
  
  saveProducts(products) {
    _currentProducts = [..._currentProducts, ...products];
  }
  
  getCurrentProducts() {
    return _currentProducts;
  }
  
  updateCartProduct(products){
    _cartProducts = [...products];
    this.saveToCartProducts(_cartProducts);
  }
  
  saveToCartProducts(item){
    localStorage.setItem(_cartItemKey, JSON.stringify(item));
  }
  
  getCartProducts(){
    return localStorage.getItem(_cartItemKey)
      ? JSON.parse(localStorage.getItem(_cartItemKey))
      : [];
  }
  
  setCartValues(cart) {
    let itemsTotal = 0;
    cart.map(item => {
      itemsTotal += item.cartQuantity;
    });
    numberCartItem.innerText = itemsTotal;
  }
  
  // get products according to pageIndex & paseSize
  getProducts(startIndex = 0, pageSize = 3){
    const lastIndex = startIndex + pageSize;
    const loadedProducts = this.allProducts.slice(startIndex, lastIndex);
    return loadedProducts;
  } 
}

export default new ProductServices();

