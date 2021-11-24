import { cartTemplate } from "./cart-template.js";
import {
  getCartProducts,
  updateCartProduct,
} from "../services/sharedproduct.service.js";

class CartPopup {
  cartListElement = document.getElementById("cart-list");
  currentCartProduct = getCartProducts();
  contentHided = document.querySelectorAll(".js-hide-on-none");
  numberInCart = document.querySelector(".js-number-cart");
  numberInCartItem = document.querySelector(".js-number-cart-item");
  currentCartProduct = getCartProducts(); 

  // constructor() {
  //   this.loadCartProducts();
  // }

  loadCartProducts() {
    console.log("this.currentCartProduct in load cart", this.currentCartProduct);
    this.renderCartProduct(this.currentCartProduct);
    this.displayNumberInCart(this.currentCartProduct);
    this.totalPrice(this.currentCartProduct);
  }

  renderCartProduct(products = []) {
    products.forEach((product) => {
      this.cartListElement.appendChild(cartTemplate(product));
    });
    setTimeout(() => {
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
        this.numberInCartItem.innerHTML = `${totalNumberItem} Products`;
        console.log("totalNumberItem", totalNumberItem);
      }
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
    const self = this;
    if (item.cartQuantity < item.quantity) {
      button.classList.remove("disable");
      item.cartQuantity += 1;
      console.log("item cart quantity", item.cartQuantity);
      this.currentCartProduct[index] = item;
      updateCartProduct(this.currentCartProduct);
      self.loadCartProducts()
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
    console.log('target', item);
    console.log("item in delete", item, "index", index);
    this.currentCartProduct = this.currentCartProduct.filter(item => item.id !== index);
    console.log('after', this.currentCartProduct)
    updateCartProduct(this.currentCartProduct);
    this.loadCartProducts();
  }
  async initIncreaseCartEvent() {
    let buttons = document.querySelectorAll(".js-cart-increase");
    const self = this;
    buttons.forEach(function (button) {
      button.addEventListener("click", function (e) {
        // e.preventDefault();
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
  async initDecreaseCartEvent() {
    let buttons = document.querySelectorAll(".js-cart-decrease");
    const self = this;
    buttons.forEach(function (button) {
      button.addEventListener("click", function (e) {
        // e.preventDefault();
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
  async initDeleteCartEvent() {
    let deleteCartButton = document.querySelectorAll(".js-cart-delete");
    const self = this;
    deleteCartButton.forEach(function (deleteBtn) {
      deleteBtn.addEventListener("click", function (e) {
        // e.preventDefault();
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

  // cartLogic() {
  //   this.cartListElement.addEventListener("click", (event) => {
  //     if (event.target.classList.contains("js-cart-increase")) {
  //       let increaseButton = event.target;
  //       let id = increaseButton.getAttribute("data-id");
  //       let tempItem = this.currentCartProduct.find((item) => item.id === id);
  //       tempItem.cartQuantity += 1;
  //       saveToCartProducts(this.currentCartProduct);
  //       increaseButton.prevElementSibling.innerText = tempItem.cartQuantity;
  //     }
  //   });
  // }
}

// export default new CartPopup();

document.addEventListener("DOMContentLoaded", ()=>{
  const cartPopup = new CartPopup();
  cartPopup.loadCartProducts();
})