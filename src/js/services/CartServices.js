class CartServices {
    _cartProduct = [];
    CART_ITEM_KEY = '_cartItemKey';
    numberCartItem = document.querySelector('.js-number-cart');
    
    updateCartProduct(products){
      this._cartProducts = [...products];
      this.saveToCartProducts(this._cartProducts);
    }
    
    saveToCartProducts(item){
      localStorage.setItem(this.CART_ITEM_KEY, JSON.stringify(item));
    }
    
    getCartProducts(){
      return localStorage.getItem(this.CART_ITEM_KEY)
        ? JSON.parse(localStorage.getItem(this.CART_ITEM_KEY))
        : [];
    }
    
    setCartValues(cart) {
      let _itemsTotal = 0;
      cart.map(item => {
        _itemsTotal += item.cartQuantity;
      });
      this.numberCartItem.innerText = _itemsTotal;
    }
  }
  
  export default new CartServices();
  