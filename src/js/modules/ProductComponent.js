import ProductItemBuilder from "./ProductItemBuilder.js";
import WishList from "./WishList.js";
import ProductServices from "../services/ProductServices.js";
import CartServices from "../services/CartServices.js";

class ProductComponent {
  startIndex = 0;
  pageSize = 3;
  currentProducts = [];
  productListElement = document.getElementById("product-list");
  numberProducts = 0;
  numberProductsContainer = document.getElementById("numberProducts");

  constructor() {
    this.loadProducts();
    this.bindingEvents();
  }

  loadProducts = async () => {
    try {
      await ProductServices.fetchProducts();
      this.numberProductsContainer.innerHTML = ProductServices._productsCount;
      this.loadNewProductsToRender();
    } catch (err) {
      console.log(err);
    }
  };

  displayProducts(products = []) {
    let existingCart = CartServices.getCartProducts();
    products.forEach((product) => {
      this.productListElement.appendChild(ProductItemBuilder.buildFromDataModel(product));
    });
    this.bindingAddToCartEvent();
    CartServices.setCartValues(existingCart);
    WishList.initWish();
  }
  async loadNewProductsToRender(startIndex = 0, pageSize = this.pageSize) {
    try {
      const loadedProducts = await ProductServices.getProducts(
        startIndex,
        pageSize
      );
      if (loadedProducts.length === 0 || loadedProducts.length < pageSize) {
        const button = document.getElementById("load-more");
        button.classList.add("hide");
      }
      this.currentProducts = [...this.currentProducts, ...loadedProducts];
      // save new products
      ProductServices.saveProducts(this.currentProducts);
      // Display products
      this.displayProducts(loadedProducts);
    } catch (err) {
      console.log(err);
    }
  }

  loadMore() {
    // Change page index
    this.startIndex = this.startIndex + this.pageSize;
    this.loadNewProductsToRender(this.startIndex);
  }

  bindingAddToCartEvent() {
    let button = this.productListElement.querySelectorAll(".js-add-cart");
    const self = this;
    button.forEach(function (addBtn) {
      addBtn.addEventListener("click", function (e) {
        let productId = Number(e.currentTarget.getAttribute("data-id"));
        
        self.addToCartProducts(productId);
      });
    });
  }

  addToCartProducts(productId) {
    const targetProduct = ProductServices._allProducts.find(
      (target) => target.id === productId
    );
    let cartProducts = CartServices.getCartProducts();
    const index = cartProducts.findIndex((product) => product.id === targetProduct.id);

    if (index !== -1) {
      // storage quantity is cart maximum amount => return storage number
      if (cartProducts[index].cartQuantity < targetProduct.quantity) {
        // cartProducts[index].cartQuantity += 1;
        targetProduct.isOutOfStock =
          cartProducts[index].cartQuantity === targetProduct.quantity ? true : false;
      }
    } else {
      if (targetProduct.quantity === 0) {
        return; //Do not add targetProduct into cart
      }

      // Add to cart
      targetProduct.isOutOfStock = targetProduct.quantity === 1 ? true : false;
      cartProducts.push({ ...targetProduct, cartQuantity: 1 });
    }

    CartServices.updateCartProduct(cartProducts);
    CartServices.setCartValues(cartProducts);
  }

  bindingEvents() {
    document
      .getElementById("load-more")
      .addEventListener("click", this.loadMore.bind(this));
  }
}

export default new ProductComponent();