
var start = 0;
var end = 3;

import './modules/Cart.js';
import './modules/Dropdown.js';
import './modules/FilterSortFunction.js';
import './modules/LazyFunction.js';
import './modules/Menu.js';
import './modules/Product.js';

// const loadProducts = async () => {
//   try {
//     const res = await fetch("src/product.json");
//     let products = await res.json();
//     var sliced = products.slice(start, end);
//     // displayProducts(sliced);
//     // filteringProduct(products);
//   } catch (err) {
//     console.log(err);
//   }
// };
// loadProducts();




const productList = document.querySelector(".js-product-list");
const displayProducts = (products) => {
  products.map((product, index) => {
    const currentProduct = displayProduct(product);
    console.log("currentProduct", currentProduct);
    productList.appendChild(currentProduct);
  });
};



var numberInWish = document.querySelector(".js-number-wish");
let numberWish = document.querySelectorAll(".heart-active").length;
numberInWish.innerHTML = `${numberWish}`;

if (numberCart == 0) {
  document.querySelectorAll(".js-hide-on-none").forEach(function (item) {
    item.classList.add("hide");
  });
}

cart.addEventListener("click", function () {
  if (cart.classList.contains("cart-active")) {
    cart.classList.remove("cart-active");
  } else {
    cart.classList.add("cart-active");
  }
});
