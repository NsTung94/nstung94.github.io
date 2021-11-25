import { cartTemplate } from "./cart-template.js";
import {
  getCartProducts,
  updateCartProduct,
} from "../services/sharedproduct.service.js";

class CartPopup {
  // currentCartProduct = getCartProducts();
  cartListElement = document.getElementById("cart-list");
  contentHided = document.querySelectorAll(".js-hide-on-none");
  numberInCart = document.querySelector(".js-number-cart");
  numberInCartItem = document.querySelector(".js-number-cart-item");
  // constructor() {
  //   this.loadCartProducts();
  // }

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
      this.initIncreaseCartEvent(products);
      this.initDecreaseCartEvent(products);
      this.initDeleteCartEvent(products);
    }, 100);
  }

  displayNumberInCart(products) {
    let totalNumberItem = 0;
    products.forEach((item) => (totalNumberItem += item.cartQuantity));
    this.contentHided.forEach((content) => {
      if (products.length === 0) {
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

  increaseCartItemQuantity(products, item, button, index) {
    console.log("button", button)
    const self= this;
    if (item.cartQuantity < item.quantity) {
      button.classList.remove("disable");
      item.cartQuantity += 1;
      console.log("item cart quantity", item.cartQuantity);
      products[index] = item;
      updateCartProduct(products);
    } else {
      button.classList.add("disable");
      self.loadCartProducts();
    }
    this.loadCartProducts();
  }
  decreaseCartItemQuantity(products, item, button, index) {
    const self = this;
    if (item.cartQuantity > 0) {
      button.classList.remove("disable");
      item.cartQuantity -= 1;
      console.log("item cart quantity", item.cartQuantity);

      products[index] = item;
      updateCartProduct(products);
    } else {
      self.deleteCart(products, item);

    }
    this.loadCartProducts();
  }
  deleteCart(products, item) {
    console.log("before delete", products);
    products = products.filter(
      (product) => product !== item
    );
    console.log("after delete", products);
    updateCartProduct(products);
    this.loadCartProducts();
  }
  async initIncreaseCartEvent(products) {
    let buttons = document.querySelectorAll(".js-cart-increase");
    const self = this;
    buttons.forEach(function (button) {
      button.addEventListener("click", function (e) {
        let productId = Number(e.currentTarget.getAttribute("data-id"));
        const targetProduct = products.find(
          (target) => target.id === productId
        );
        const index = products.findIndex(
          (target) => target.id === productId
        );
        self.debounce(
          self.increaseCartItemQuantity(products, targetProduct, button, index),
          100
        );
      });
    });
  }
  async initDecreaseCartEvent(products) {
    let buttons = document.querySelectorAll(".js-cart-decrease");
    const self = this;
    buttons.forEach(function (button) {
      button.addEventListener("click", function (e) {
        let productId = Number(e.currentTarget.getAttribute("data-id"));
        const targetProduct = products.find(
          (target) => target.id === productId
        );
        const index = products.findIndex(
          (target) => target.id === productId
        );
        self.debounce(
          self.decreaseCartItemQuantity(products, targetProduct, button, index),
          100
        );
      });
    });
  }
  async initDeleteCartEvent(products) {
    let deleteCartButton = document.querySelectorAll(".js-cart-delete");
    const self = this;
    deleteCartButton.forEach(function (deleteBtn) {
      deleteBtn.addEventListener("click", function (e) {
        let productId = Number(e.currentTarget.getAttribute("data-id"));
        const targetProduct = products.find(
          (target) => target.id === productId
        );

        self.deleteCart(products,targetProduct);
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
