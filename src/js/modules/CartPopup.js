import { cartTemplate } from "./cart-template.js";
import {
  getCartProducts,
  updateCartProduct,
} from "../services/sharedproduct.service.js";
class CartPopup {
  cartListElement = document.getElementById("cart-list");
  currentCartProduct = getCartProducts();

  constructor() {
    this.loadCartProducts();
    this.displayNumberInCart();
    this.totalPrice();
  }

  loadCartProducts() {
    const currentCartProduct = getCartProducts();
    console.log("this.currentCartProduct in load cart", currentCartProduct);
    this.displayCartProducts(currentCartProduct);
  }

  displayCartProducts(products = []) {
    products.forEach((product) => {
      this.cartListElement.appendChild(cartTemplate(product));
    });
    setTimeout(() => {
      this.initDecreaseCartEvent();
      this.initDeleteCartEvent();
      this.initIncreaseCartEvent();
    }, 100);
  }

  increaseCartItemQuantity(item, button, index) {
    const self = this;
    if (item.cartQuantity < item.quantity) {
      button.classList.remove("disable");
      item.cartQuantity += 1;
      console.log("item cart quantity", item.cartQuantity);
      this.currentCartProduct[index] = item;
      updateCartProduct(this.currentCartProduct);
      self.debounce(self.loadCartProducts(), 100);
    } else {
      button.classList.add("disable");
    }
  }
  decreaseCartItemQuantity(item, button, index) {
    const self = this;
    if (item.cartQuantity > 0) {
      button.classList.remove("disable");
      item.cartQuantity -= 1;
      console.log("item cart quantity", item.cartQuantity);

      this.currentCartProduct[index] = item;
      updateCartProduct(this.currentCartProduct);
      self.loadCartProducts();
    } else {
      button.classList.add("disable");
    }
  }
  deleteCart(item, index) {
    console.log("before delete", this.currentCartProduct);
    console.log("item in delete", item, "index", index);
    this.currentCartProduct = this.currentCartProduct.splice(index, 1);
    console.log("after delete", this.currentCartProduct);
    this.loadCartProducts();
  }

  displayNumberInCart() {
    let totalNumberItem = 0;
    this.currentCartProduct.map(
      (current) => (totalNumberItem += current.cartQuantity)
    );
    let numberInCart = document.querySelector(".js-number-cart");
    let numberInCartItem = document.querySelector(".js-number-cart-item");
    numberInCart.innerHTML = `${totalNumberItem}`;
    numberInCartItem.innerHTML = `${totalNumberItem} Products`;
    console.log("totalNumberItem", totalNumberItem);
  }
  totalPrice() {
    let totalPrice = document.querySelector(".js-totalPrice");
    let totalCost = 0;
    this.currentCartProduct.map((item) => {
      let cost = item.price.new * item.cartQuantity;
      totalCost += cost;
    });
    totalPrice.innerHTML = `${totalCost.toLocaleString("de")} đ`;
    return totalPrice;
  }

  async initIncreaseCartEvent() {
    let buttons = document.querySelectorAll(".js-cart-increase");
    const self = this;
    buttons.forEach(function (button) {
      button.addEventListener("click", function (e) {
        e.preventDefault();
        let productId = Number(e.currentTarget.getAttribute("data-id"));
        const targetProduct = self.currentCartProduct.find(
          (target) => target.id === productId
        );
        const index = self.currentCartProduct.findIndex(
          (target) => target.id === productId
        );
        self.increaseCartItemQuantity(targetProduct, button, index);
      });
    });
  }
  initDecreaseCartEvent() {
    let buttons = document.querySelectorAll(".js-cart-decrease");
    const self = this;
    buttons.forEach(function (button) {
      button.addEventListener("click", function (e) {
        e.preventDefault();
        let productId = Number(e.currentTarget.getAttribute("data-id"));
        const targetProduct = self.currentCartProduct.find(
          (target) => target.id === productId
        );
        const index = self.currentCartProduct.findIndex(
          (target) => target.id === productId
        );
        self.decreaseCartItemQuantity(targetProduct, button, index);
      });
    });
  }
  initDeleteCartEvent() {
    let deleteCartButton = document.querySelectorAll(".js-cart-delete");
    const self = this;
    deleteCartButton.forEach(function (deleteBtn) {
      deleteBtn.addEventListener("click", function (e) {
        e.preventDefault();
        let productId = Number(e.currentTarget.getAttribute("data-id"));
        const targetProduct = self.currentCartProduct.find(
          (target) => target.id === productId
        );
        const index = self.currentCartProduct.findIndex(
          (target) => target.id === productId
        );
        self.deleteCart(targetProduct, index);
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
