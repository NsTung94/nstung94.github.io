import { getProductFromStorage, saveProductInStorage } from "./Product.js";
import { cartTemplate } from "./cart-template.js";
let currentCartItems = getProductFromStorage();
class CartPopup {
  displayCart() {
    let cartList = document.querySelector(".js-cart-list");
    console.log("currentCartItems", currentCartItems);
    currentCartItems.map((item) => {
      cartList.appendChild(cartTemplate(item));
      cartPopup.displayNumberInCart();
    });
    this.totalPrice();
  }
  increaseQuantity(item) {
    let button = document.querySelector('.js-cart-increase');
    if ( item.cartQuantity < item.quantity){
      button.addEventListener('click', function(){
        item.cartQuantity += 1;
        cartPopup.displayCart();
      })
    }else {
      button.classList.add("disable");
    }


  }
  decreaseQuantity(item) {
    let button = document.querySelector('.js-cart-decrease');
    if (item.cartQuantity > 0){
      item.cartQuantity -= 1;
    }else{
      button.classList.add('disable');
    }
  }
  displayNumberInCart() {
    let totalNumberItem = 0;
    currentCartItems.map(
      (current) => (totalNumberItem += current.cartQuantity)
    );
    let numberInCart = document.querySelector(".js-number-cart");
    numberInCart.innerHTML = `${totalNumberItem}`;
    console.log("totalNumberItem", totalNumberItem);

  }
  totalPrice() {
    let totalPrice = document.querySelector(".js-totalPrice");
    let totalCost = 0;
    currentCartItems.map((item) => {
      let cost = item.price.new * item.cartQuantity;
      totalCost += cost;
    });
    totalPrice.innerHTML = `${totalCost.toLocaleString("de")} đ`;
    return totalPrice;
  }
}

const cartPopup = new CartPopup();
cartPopup.displayCart();
export const {increaseQuantity, decreaseQuantity} = new CartPopup();