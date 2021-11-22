import "./Wish.js";
import { productItemTemplate } from "./product-template.js";
const productItems = [];
let startIndex = 0;
let pageSize = 3;
const _cartItemKey = "_cartItemKey";
const productList = document.querySelector(".js-product-list");

class Product {
  loadProducts = async () => {
    try {
      const res = await fetch("src/product.json");
      let products = await res.json();
      products.map((product, id) => {
        productItems.push(product);
      });
    } catch (err) {
      console.log(err);
    }
  };
  purchaseProduct() {
    let button = productList.querySelectorAll(".js-add-cart");

    button.forEach(function(addBtn) {
      addBtn.addEventListener("click", function (e) {
        e.preventDefault();
        console.log('clicked',e.currentTarget);
        let productId = Number(
          e.currentTarget.getAttribute("data-id")
        );
        const targetProduct = productItems.find(
          (target) =>
              target.id === productId
        );
        product.saveProductInStorage(targetProduct);
      });
    });  
  }
  display() {
    // setTimeout(function () {
    let size = startIndex + pageSize;
    let currentProducts = productItems.slice(startIndex, size);
    currentProducts.map((product) =>
      productList.appendChild(productItemTemplate(product))
    );

    // }, 1000);
  }
  loadMore() {
    setTimeout(function () {
      product.display();
    }, 2000);
    let button = document.querySelector(".loadMore");
    button.addEventListener("click", function () {
      startIndex += pageSize;
      product.display();
    });
  }
  // get all the products info if there is any in the local storage
  getProductFromStorage() {
    return localStorage.getItem(_cartItemKey)
      ? JSON.parse(localStorage.getItem(_cartItemKey))
      : [];
    // returns empty array if there isn't any product info
  }
  // save the product in the local storage
  saveProductInStorage(item) {
    let existedItems = getProductFromStorage();
    // check if target is existed
    const found = existedItems.some((product) => product.id === item.id);
    if (found) {
      const index = existedItems.findIndex((product) => product.id === item.id);

      // storage quantity is cart maximum amount => return storage number
      if (
        existedItems[index].cartQuantity > existedItems[index].quantity ||
        existedItems[index].cartQuantity === existedItems[index].quantity
      ) {
        existedItems[index].cartQuantity = existedItems[index].quantity;
      } else {
        // cart amount +1 every click
        existedItems[index].cartQuantity = 1;
      }
      localStorage.setItem(_cartItemKey, JSON.stringify(existedItems));
    }
    // done exist then push more
    else {
      console.log("item", item);
      if (item.quantity === 0) {
        item.cartQuantity = 0;
      } else {
        item.cartQuantity = 1;
      }
      existedItems.push(item);
      localStorage.setItem(_cartItemKey, JSON.stringify(existedItems));
    }
  }
}

const product = new Product();
product.loadProducts();
product.loadMore();
// product.purchaseProduct();
export const { purchaseProduct, getProductFromStorage, saveProductInStorage } =
  new Product();