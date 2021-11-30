class CartServices {
    _cartProduct = [];
    _cartItemKey = '_cartItemKey';
    numberCartItem = document.querySelector('.js-number-cart');
    
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
  }
  
  export default new CartServices();
  