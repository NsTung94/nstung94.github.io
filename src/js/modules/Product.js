import { template } from "./product-template.js";
import Wish from "./wish.js";
import {
  productsCount,
  fetchProducts,
  getCartProducts,
  saveProducts,
  setCartValues,
  updateCartProduct,
  getProducts,
} from "../services/sharedproduct.service.js";
import { allProducts } from "../services/sharedproduct.service.js";

class Product {
  startIndex = 0;
  pageSize = 3;
  currentProducts = [];
  productListElement = document.getElementById("product-list");
  existingCart = getCartProducts();
  numberProducts = 0;
  numberProductsContainer = document.getElementById("numberProducts");
  constructor() {
    this.loadProducts();
    this.initEvents();
  }

  
  loadProducts = async () => {
    try {
      const products = await fetchProducts();
      console.log("products", productsCount)     
      this.numberProductsContainer.innerHTML = productsCount;
      this.loadNewProductsToRender();
    } catch (err) {
      console.log(err);
    }
  };

 

  displayProducts(products = []) {
    products.forEach((product) => {
      this.productListElement.appendChild(template(product));
    });
    this.initAddToCartEvent();
    setCartValues(this.existingCart);
    Wish.initWish();
  }

  loadNewProductsToRender(startIndex = 0, pageSize = this.pageSize) {
    const loadedProducts = getProducts(startIndex, pageSize);
    if (loadedProducts.length === 0 || loadedProducts.length < pageSize) {
      const button = document.getElementById("load-more");
      button.classList.add("hide");
    } else {
      this.currentProducts = [...this.currentProducts, ...loadedProducts];
    }
    // save new products
    saveProducts(this.currentProducts);
    // Display products
    this.displayProducts(loadedProducts);
  }

  loadMore() {
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
        const targetProduct = allProducts.find(
          (target) => target.id === productId
        );
        self.addToCartProducts(targetProduct);
      });
    });
  }

  addToCartProducts(item) {
    let cartProducts = getCartProducts();
    const index = cartProducts.findIndex((product) => product.id === item.id);

    if (index !== -1) {
      // storage quantity is cart maximum amount => return storage number
      if (cartProducts[index].cartQuantity < item.quantity) {
        // cartProducts[index].cartQuantity += 1;
        item.isOutOfStock =
          cartProducts[index].cartQuantity === item.quantity ? true : false;
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

  initEvents() {
    document
      .getElementById("load-more")
      .addEventListener("click", this.loadMore.bind(this));
  }
}

export default new Product();
