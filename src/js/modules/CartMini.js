import { cartTemplate } from "./cart-template.js";
import {
  getCartProducts,
  setCartValues,
  updateCartProduct,
} from "../services/sharedproduct.service.js";
class CartMini {
  cartListElement = document.getElementById("cart-list");
  contentHided = document.querySelectorAll(".js-hide-on-none");
  numberInCart = document.querySelector(".js-number-cart");
  numberInCartItem = document.querySelector(".js-number-cart-item");
  addToCart = document.querySelectorAll('.js-add-cart');
  constructor(){
    this.cartPopUp();
  }
  
  cartPopUp() {
    let cartDisplay = document.querySelector('.js-cart');
    let cartButton = document.querySelector('.js-cart-open');
    
    const self = this;
    cartButton.addEventListener('click', function(){
      if (cartDisplay.classList.contains('cart-active')){
        cartDisplay.classList.remove('cart-active');
        self.loadCartProducts()
      }else{
        cartDisplay.classList.add('cart-active');
        self.addToCart.forEach(button => button.classList.add('disable'))
        self.loadCartProducts()
      }
    })
  }

  loadCartProducts() {
    let currentCartProducts= getCartProducts();
    this.renderCartProduct(currentCartProducts);
    this.displayNumberInCart(currentCartProducts);
    this.totalPrice(currentCartProducts);
  }

  renderCartProduct(products = []) {
    this.cartListElement.innerHTML = ``;
    products.forEach((product) =>
      this.cartListElement.appendChild(cartTemplate(product))
    );
    setTimeout(() => {
      //init something
      this.initIncreaseCartEvent(products);
      this.initDecreaseCartEvent(products);
      this.initDeleteCartEvent(products);
    }, 0);
  }

  displayNumberInCart(products) {
    let totalNumberItem = 0;
    products.forEach((item) => (totalNumberItem += item.cartQuantity));
    this.contentHided.forEach((content) => {
      if (products.length === 0) {
        content.classList.add("hide");
        setCartValues([])
      } else {
        content.classList.remove("hide");
        this.numberInCart.innerHTML = `${totalNumberItem}`;
      }
      this.numberInCartItem.innerHTML = `${totalNumberItem} Products`;
    });
  }

  totalPrice(products) {
    let totalPrice = document.querySelector(".js-totalPrice");
    let totalCost = 0;
    products.forEach((item) => {
      let cost = item.price.new * item.cartQuantity;
      totalCost += cost;
    });
    totalPrice.innerHTML = `${totalCost.toLocaleString("de")} đ`;
    return totalPrice;
  }

  increaseCartItemQuantity(products, button, productId) {
    const item = products.find(
      (target) => target.id === productId
    );
    const index = products.findIndex(
      (target) => target.id === productId
    );
    const self= this;
    if (item.cartQuantity < item.quantity) {
      button.classList.remove("disable");
      item.cartQuantity += 1;
      products[index] = item;
      updateCartProduct(products);
    } else {
      button.classList.add("disable");
      self.loadCartProducts();
    }
    this.loadCartProducts();
  }
  decreaseCartItemQuantity(products, button, productId) {
    const self = this;
    const item = products.find(
      (target) => target.id === productId
    );
    const index = products.findIndex(
      (target) => target.id === productId
    );
    if (item.cartQuantity > 1) {
      button.classList.remove("disable");
      item.cartQuantity -= 1;
      products[index] = item;
      updateCartProduct(products);
    } else {
      self.deleteCart(products, productId);
    }
    this.loadCartProducts();
  }
  deleteCart(products, productId) {
    const item = products.find(
      (target) => target.id === productId
    );
    products = products.filter(
      (product) => product !== item
    );
    updateCartProduct(products);
    this.loadCartProducts();
  }
  async initIncreaseCartEvent(products) {
    let buttons = document.querySelectorAll(".js-cart-increase");
    const self = this;
    buttons.forEach(function (button) {
      button.addEventListener("click", function (e) {
        let productId = Number(e.currentTarget.getAttribute("data-id"));
          self.increaseCartItemQuantity(products, button, productId)
      });
    });
  }
  async initDecreaseCartEvent(products) {
    let buttons = document.querySelectorAll(".js-cart-decrease");
    const self = this;
    buttons.forEach(function (button) {
      button.addEventListener("click", function (e) {
        let productId = Number(e.currentTarget.getAttribute("data-id"));
        
          self.decreaseCartItemQuantity(products, button, productId);
      });
    });
  }
  async initDeleteCartEvent(products) {
    let deleteCartButton = document.querySelectorAll(".js-cart-delete");
    const self = this;
    deleteCartButton.forEach(function (deleteBtn) {
      deleteBtn.addEventListener("click", function (e) {
        let productId = Number(e.currentTarget.getAttribute("data-id"));
        self.deleteCart(products, productId);
      });
    });
  }
}

export default new CartMini();
