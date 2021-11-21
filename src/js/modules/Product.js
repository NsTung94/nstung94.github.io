import "./Wish.js";
import { displayProduct } from "./product-template.js";
export const productItems = [];
let startIndex = 0;
let pageSize = 3;
// const productItemKey = "_productItemKey";
class Product {
  // productItems = [];
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
  display() {
    let productList = document.querySelector(".js-product-list");
    // setTimeout(function () {
    let size = startIndex + pageSize;
    let currentProducts = productItems.slice(startIndex, size);
    currentProducts.map((product) =>
      productList.appendChild(displayProduct(product))
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
  purchaseProduct() {
    var button = document.querySelectorAll(".js-add-cart");
    // console.log("button", button);
    button.forEach(function (addBtn) {
      // console.log('add ne', addBtn)
      addBtn.addEventListener("click", function (e) {
        e.preventDefault();
        console.log("detail of e", e);
        let productId = Number(
          e.target.parentElement.parentElement.getAttribute("data-id")
        );
        const targetProduct = productItems.find(
          (target) =>
            function () {
              target.id === productId;
            }
        );
        console.log("targeted", targetProduct);
        product.saveProductInStorage(targetProduct);
      });
    });
  }

  // get all the products info if there is any in the local storage
  getProductFromStorage() {
    return localStorage.getItem("products")
      ? JSON.parse(localStorage.getItem("products"))
      : [];
    // returns empty array if there isn't any product info
  }

  // save the product in the local storage
  saveProductInStorage(item) {
    let products = product.getProductFromStorage();
    // check if target is existed
    const found = products.some((product) => product.id === item.id);
    if (found) {
      const index = products.findIndex((product) => product.id === item.id);
      console.log("products[index]", products[index]);
      products[index].cartQuantity += 1;
      localStorage.setItem("products", JSON.stringify(products));
    }
    // done exist then push more
    else {
      console.log("item", item);
      item.cartQuantity = 1;
      products.push(item);
      localStorage.setItem("products", JSON.stringify(products));
    }
  }
}

const product = new Product();
product.loadProducts();
product.loadMore();
// product.purchaseProduct();
export const { purchaseProduct } = new Product();
