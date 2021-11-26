import { template } from "./product-template.js";
import Wish from "./wish.js";
import ProductServices from "../services/sharedproduct.service.js";

class Product {
  startIndex = 0;
  pageSize = 3;
  currentProducts = [];
  productListElement = document.getElementById("product-list");
  numberProducts = 0;
  numberProductsContainer = document.getElementById("numberProducts");

  constructor() {
    this.loadProducts();
    this.initEvents();
  }

  loadProducts = async () => {
    try {
      await ProductServices.fetchProducts();
      this.numberProductsContainer.innerHTML = ProductServices.productsCount;
      this.loadNewProductsToRender();
    } catch (err) {
      console.log(err);
    }
  };

  displayProducts(products = []) {
    let existingCart = ProductServices.getCartProducts();
  
    const promise = new Promise((resolve, reject) => {
        products.forEach((product) => {
        this.productListElement.appendChild(template(product));
        });
        this.initAddToCartEvent();
        ProductServices.setCartValues(existingCart);
        resolve(true);
    })
    promise.then(()=>{
      Wish.initWish()
    })
  }
  loadNewProductsToRender(startIndex = 0, pageSize = this.pageSize) {
    const loadedProducts = ProductServices.getProducts(startIndex, pageSize);
    if (loadedProducts.length === 0 || loadedProducts.length < pageSize) {
      const button = document.getElementById("load-more");
      button.classList.add("hide");
    } else {
      this.currentProducts = [...this.currentProducts, ...loadedProducts];
    }

    // save new products
    ProductServices.saveProducts(this.currentProducts);
    // Display products
    this.displayProducts(loadedProducts);
    //
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
        const targetProduct = ProductServices.allProducts.find(
          (target) => target.id === productId
        );
        self.addToCartProducts(targetProduct);
      });
    });
  }

  addToCartProducts(item) {
    let cartProducts = ProductServices.getCartProducts();
    const index = cartProducts.findIndex((product) => product.id === item.id);

    if (index !== -1) {
      // storage quantity is cart maximum amount => return storage number
      if (cartProducts[index].cartQuantity < item.quantity) {
        // cartProducts[index].cartQuantity += 1;
        item.isOutOfStock =
          cartProducts[index].cartQuantity === item.quantity ? true : false;
      }
    } else {
      if (item.quantity === 0) {
        return; //Do not add item into cart
      }

      // Add to cart
      item.isOutOfStock = item.quantity === 1 ? true : false;
      cartProducts.push({ ...item, cartQuantity: 1 });
    }

    ProductServices.updateCartProduct(cartProducts);
    ProductServices.setCartValues(cartProducts);
  }

  initEvents() {
    document
      .getElementById("load-more")
      .addEventListener("click", this.loadMore.bind(this));
  }
}

export default new Product();
