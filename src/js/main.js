import { openMenu, openSubMenu } from "./modules/menu.js";
import { wish } from './modules/wish.js';
import { dropdown, language } from "./modules/dropdown.js";
import reset from "./modules/reset.js";
import {
  filterSelector,
  closeFilterSelector,
  sortSelector,
  closeSortSelector,
} from "./modules/moveUp.js";
import displayProduct from './modules/displayProduct.js';
import addCart from './modules/addCart.js';


openMenu(".js-open-menu");
openSubMenu();
wish();
dropdown(".js-dropdown-menu");
language();
reset();
filterSelector();
closeFilterSelector();
sortSelector();
closeSortSelector();
addCart();

var start = 0
var end = 3;

function reachLoadMore(destinationClass) {
  let destination = document.querySelector(destinationClass);

  let observer = new IntersectionObserver(function (entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
          start += 3;
          end += 3;
         loadProducts();
        } 
    });
  },
  {
    threshold: 1,
    
  });

  observer.observe(destination);
}

reachLoadMore('.loadMore');

const loadProducts = async () => {
  try {
    const res = await fetch("src/product.json");
    let products = await res.json();
    var sliced = products.slice(start, end);
    displayProducts(sliced);
  } catch (err) {
    console.log(err);
  }
};
setTimeout(loadProducts(), 3000);


const productList = document.querySelector(".js-product-list");

const displayProducts = (products) => {
  products.map((product, index) => {
    const currentProduct = displayProduct(product);
    console.log("currentProduct", currentProduct);
    productList.appendChild(currentProduct);
  })
};



// lazy image using Intersection Observer to check viewport
document.addEventListener("DOMContentLoaded", function () {
  var lazyObjects = [].slice.call(document.querySelectorAll(".lazy-observer"));

  if ("IntersectionObserver" in window) {
    let lazyObjectObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            let lazyObject = entry.target;
            lazyObject.src = lazyObject.dataset.src;
            lazyObject.style.zIndex = "1";
            lazyObject.classList.remove("lazy-observer");
            lazyObject.parentElement.classList.remove("placeholder");
            lazyObjectObserver.unobserve(lazyObject);
          }
        });
      },
      {
        threshold: 0,
        rootMargin: "500px",
      }
    );

    lazyObjects.forEach(function (lazyObject) {
      lazyObjectObserver.observe(lazyObject);
    });
  }
});
