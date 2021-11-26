import { template } from "./product-template.js";
import Wish from './wish.js'

import {
  getCartProducts,
  saveProducts,
  setCartValues,
  updateCartProduct,
} from "../services/sharedproduct.service.js";
const productItems = [];

class Product {
  startIndex = 0;
  pageSize = 3;
  currentProducts = [];
  productListElement = document.getElementById("product-list");
  existingCart = getCartProducts();
  numberProducts = 0;
  numberProductsContainer = document.querySelector('#numberProducts')
  constructor() {
    this.loadProducts();
    this.initEvents();
    
  }

  loadProducts = async () => {
    try {
      const res = await fetch("src/product.json");
      let products = await res.json();
      products.map((product) => {
        productItems.push(product);
      });
      this.numberProducts = productItems.length;
      this.loadNewProductsToRender();
      this.numberProductsContainer.innerHTML = this.numberProducts
    } catch (err) {
      console.log(err);
    }
  };

  displayProducts(products = []) {
    products.forEach((product) => {
      this.productListElement.appendChild(template(product));
    });
    setTimeout(() => {
      this.initAddToCartEvent();
      setCartValues(this.existingCart);
      Wish.initWish();
    }, 100);
  }

  loadNewProductsToRender(startIndex = 0, pageSize = this.pageSize) {
    const lastIndex = startIndex + pageSize;
    const loadedProducts = productItems.slice(startIndex, lastIndex);
    if (loadedProducts.length === 0 || loadedProducts.length < pageSize){
        const button = document.querySelector('#load-more');
        button.classList.add('hide');
    }else {
      this.currentProducts = [...this.currentProducts, ...loadedProducts];
    }
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
        // addBtn.classList.add('disable');
        self.addToCartProducts(targetProduct);
      });
    });
  }

  addToCartProducts(item) {
    let cartProducts = getCartProducts();
    const index = cartProducts.findIndex((product) => product.id === item.id);

    if (index !== -1) {
      // storage quantity is cart maximum amount => return storage number
      if(cartProducts[index].cartQuantity < item.quantity){
        // cartProducts[index].cartQuantity += 1;
        item.isOutOfStock = cartProducts[index].cartQuantity === item.quantity ? true : false;
      }
      // CartPopup.loadCartProducts()
    } else {
      if (item.quantity === 0) {
        return; //Do not add item into cart
      }

      // Add to cart
      item.isOutOfStock = item.quantity === 1 ? true : false;
      cartProducts.push({ ...item, cartQuantity: 1 });

    }

    updateCartProduct(cartProducts);
    setCartValues(cartProducts);
  }

  async initEvents() {
    document
      .getElementById("load-more")
      .addEventListener("click", this.newLoadMore.bind(this));
  }
}

export default new Product();
