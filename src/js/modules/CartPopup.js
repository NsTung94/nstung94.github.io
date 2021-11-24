import { cartTemplate } from "./cart-template.js";
import {
  getCartProducts,
  updateCartProduct,
} from "../services/sharedproduct.service.js";

class CartPopup {
  currentCartProduct = getCartProducts();
  cartListElement = document.getElementById("cart-list");
  contentHided = document.querySelectorAll(".js-hide-on-none");
  numberInCart = document.querySelector(".js-number-cart");
  numberInCartItem = document.querySelector(".js-number-cart-item");

  constructor() {
    this.loadCartProducts();
  }

  loadCartProducts() {
    let currentCartProduct= getCartProducts();

    this.renderCartProduct(currentCartProduct);

    console.log("in load cart", currentCartProduct);
    this.displayNumberInCart(currentCartProduct);
    this.totalPrice(currentCartProduct);
  }

  renderCartProduct(products = []) {
    this.cartListElement.innerHTML = ``;
    products.forEach((product) =>
      this.cartListElement.appendChild(cartTemplate(product))
    );
    // this.cartListElement.appendChild(products)
    setTimeout(() => {
      //init something
      this.initDecreaseCartEvent();
      this.initDeleteCartEvent();
      this.initIncreaseCartEvent();
    }, 100);
  }

  displayNumberInCart(products) {
    let totalNumberItem = 0;
    products.forEach((item) => (totalNumberItem += item.cartQuantity));
    this.contentHided.forEach((content) => {
      if (totalNumberItem === 0) {
        content.classList.add("hide");
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

  increaseCartItemQuantity(item, button, index) {
    if (item.cartQuantity < item.quantity) {
      button.classList.remove("disable");
      item.cartQuantity += 1;
      console.log("item cart quantity", item.cartQuantity);
      this.currentCartProduct[index] = item;
      updateCartProduct(this.currentCartProduct);
    } else {
      button.classList.add("disable");
    }
    this.loadCartProducts();
  }
  decreaseCartItemQuantity(item, button, index) {
    if (item.cartQuantity > 0) {
      button.classList.remove("disable");
      item.cartQuantity -= 1;
      console.log("item cart quantity", item.cartQuantity);

      this.currentCartProduct[index] = item;
      updateCartProduct(this.currentCartProduct);
    } else {
      button.classList.add("disable");
    }
    this.loadCartProducts();
  }
  deleteCart(item) {
    console.log("before delete", this.currentCartProduct);
    this.currentCartProduct = this.currentCartProduct.filter(
      (product) => product !== item
    );
    console.log("after delete", this.currentCartProduct);
    updateCartProduct(this.currentCartProduct);
    this.loadCartProducts();
  }
  async initIncreaseCartEvent() {
    let buttons = document.querySelectorAll(".js-cart-increase");
    const self = this;
    buttons.forEach(function (button) {
      button.addEventListener("click", function (e) {
        let productId = Number(e.currentTarget.getAttribute("data-id"));
        const targetProduct = self.currentCartProduct.find(
          (target) => target.id === productId
        );
        const index = self.currentCartProduct.findIndex(
          (target) => target.id === productId
        );
        self.debounce(
          self.increaseCartItemQuantity(targetProduct, button, index),
          100
        );
      });
    });
  }
  async initDecreaseCartEvent() {
    let buttons = document.querySelectorAll(".js-cart-decrease");
    const self = this;
    buttons.forEach(function (button) {
      button.addEventListener("click", function (e) {
        let productId = Number(e.currentTarget.getAttribute("data-id"));
        const targetProduct = self.currentCartProduct.find(
          (target) => target.id === productId
        );
        const index = self.currentCartProduct.findIndex(
          (target) => target.id === productId
        );
        self.debounce(
          self.decreaseCartItemQuantity(targetProduct, button, index),
          100
        );
      });
    });
  }
  async initDeleteCartEvent() {
    let deleteCartButton = document.querySelectorAll(".js-cart-delete");
    const self = this;
    deleteCartButton.forEach(function (deleteBtn) {
      deleteBtn.addEventListener("click", function (e) {
        let productId = Number(e.currentTarget.getAttribute("data-id"));
        const targetProduct = self.currentCartProduct.find(
          (target) => target.id === productId
        );

        self.deleteCart(targetProduct);
      });
    });
  }
  debounce(fn, ms) {
    let timer;
    return () => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        fn.apply(this, arguments);
      }, ms);
    };
  }
}

export default new CartPopup();
