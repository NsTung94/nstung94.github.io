import "./Wish.js";
import { productItemTemplate } from "./product-template.js";
const productItems = [];

const productList = document.querySelector(".js-product-list");
import {
  getCartProducts,
  saveProducts,
  updateCartProduct,
} from "../services/sharedproduct.service.js";

class Product {
  startIndex = 0;
  pageSize = 3;
  currentProducts = [];
  productListElement = document.getElementById("product-list");
  constructor() {
    this.loadProducts();
    this.initEvents();
  }

  loadProducts = async () => {
    try {
      const res = await fetch("src/product.json");
      let products = await res.json();
      products.map((product, id) => {
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
    this.startIndex = lastIndex;
    // save new products
    saveProducts(this.currentProducts);
    // Display products
    this.displayProducts(this.currentProducts);
  }

  newLoadMore() {
    // Change page index
    this.loadNewProductsToRender(this.startIndex);
  }

  initAddToCartEvent() {
    let button = productList.querySelectorAll(".js-add-cart");
    const self = this;
    button.forEach(function (addBtn) {
      addBtn.addEventListener("click", function (e) {
        e.preventDefault();
        let productId = Number(e.currentTarget.getAttribute("data-id"));
        const targetProduct = productItems.find(
          (target) => target.id === productId
        );
        // self.saveProductInStorage(targetProduct);
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
      updateCartProduct(cartProducts);
    } else {
      console.log("item", item);
      if (item.quantity === 0) {
        item.cartQuantity = 0;
      } else {
        item.cartQuantity += 1;
      }
      // saveToCartProducts(item)
      cartProducts.push(item);
      updateCartProduct(cartProducts);
    }
  }

  async initEvents() {
    document
      .getElementById("load-more")
      .addEventListener("click", this.newLoadMore.bind(this));
  }
}

export default new Product();
