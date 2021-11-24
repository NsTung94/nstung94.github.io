import { productItemTemplate } from "./product-template.js";
import {
  getCartProducts,
  saveProducts,
  setCartValues,
  updateCartProduct,
} from "../services/sharedproduct.service.js";
import CartPopup from "./CartPopup.js";
const productItems = [];

class Product {
  startIndex = 0;
  pageSize = 3;
  currentProducts = [];
  productListElement = document.getElementById("product-list");
  constructor() {
    this.loadProducts();
    this.initEvents();
    CartPopup.loadCartProducts();
  }

  loadProducts = async () => {
    try {
      const res = await fetch("src/product.json");
      let products = await res.json();
      products.map((product) => {
        productItems.push(product);
      });
      this.loadNewProductsToRender();
    } catch (err) {
      console.log(err);
    }
  };

  displayProducts(products = []) {
    products.forEach((product) => {
      this.productListElement.appendChild(productItemTemplate(product));
    });
    setTimeout(() => {
      this.initAddToCartEvent();
    }, 100);
  }

  loadNewProductsToRender(startIndex = 0, pageSize = this.pageSize) {
    const lastIndex = startIndex + pageSize;
    const loadedProducts = productItems.slice(startIndex, lastIndex);
    this.currentProducts = [...this.currentProducts, ...loadedProducts];
    // save new products
    saveProducts(this.currentProducts);
    // Display products
    this.displayProducts(loadedProducts);
  }

  newLoadMore() {
    // Change page index
    this.startIndex = this.startIndex + this.pageSize;
    this.loadNewProductsToRender(this.startIndex);
  }

  initAddToCartEvent() {
    let button = this.productListElement.querySelectorAll(".js-add-cart");
    const self = this;
    button.forEach(function (addBtn) {
      addBtn.addEventListener("click", function (e) {
        let productId = Number(e.currentTarget.getAttribute("data-id"));
        const targetProduct = productItems.find(
          (target) => target.id === productId
        );
        self.addToCartProducts(targetProduct);
      });
    });
  }

  addToCartProducts(item) {
    let cartProducts = getCartProducts();
    const found = cartProducts.some((product) => product.id === item.id);
    if (found) {
      const index = cartProducts.findIndex((product) => product.id === item.id);
      // storage quantity is cart maximum amount => return storage number
      if (
        cartProducts[index].cartQuantity > cartProducts[index].quantity ||
        cartProducts[index].cartQuantity === cartProducts[index].quantity
      ) {
        cartProducts[index].cartQuantity = cartProducts[index].quantity;
      } else {
        // cart amount +1 every click
        cartProducts[index].cartQuantity += 1;
      }
      console.log('new', cartProducts)
      updateCartProduct(cartProducts);
      setCartValues(cartProducts);
      CartPopup.loadCartProducts(cartProducts)
    } else {
      console.log("item", item);
      if (item.quantity === 0) {
        item.cartQuantity = 0;
      } else {
        item.cartQuantity += 1;
      }
      // saveToCartProducts(item)
      cartProducts.push(item);
      console.log('new', cartProducts)

      updateCartProduct(cartProducts);
      setCartValues(cartProducts);
      CartPopup.loadCartProducts(cartProducts)
    }
  }

  async initEvents() {
    document
      .getElementById("load-more")
      .addEventListener("click", this.newLoadMore.bind(this));
  }
}


export default new Product();