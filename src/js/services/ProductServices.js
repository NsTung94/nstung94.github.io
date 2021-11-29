class ProductServices {
  currentProducts = [];
  _cartProduct = [];
  allProducts = [];
  _cartItemKey = '_cartItemKey';
  numberCartItem = document.querySelector('.js-number-cart');
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
    this.currentProducts = [...this.currentProducts, ...products];
  }
  
  getCurrentProducts() {
    return _currentProducts;
  }
  
  updateCartProduct(products){
    this._cartProducts = [...products];
    this.saveToCartProducts(this._cartProducts);
  }
  
  saveToCartProducts(item){
    localStorage.setItem(this._cartItemKey, JSON.stringify(item));
  }
  
  getCartProducts(){
    return localStorage.getItem(this._cartItemKey)
      ? JSON.parse(localStorage.getItem(this._cartItemKey))
      : [];
  }
  
  setCartValues(cart) {
    let itemsTotal = 0;
    cart.map(item => {
      itemsTotal += item.cartQuantity;
    });
    this.numberCartItem.innerText = itemsTotal;
  }
  
  // get products according to pageIndex & paseSize
  async getProducts(startIndex = 0, pageSize = 3){
    try {
      const lastIndex = startIndex + pageSize;
      const loadedProducts = await this.allProducts.slice(startIndex, lastIndex);
      return loadedProducts;
    }catch(err) {
      console.log(err)
    }
  } 
}

export default new ProductServices();

