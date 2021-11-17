import { openMenu, openSubMenu } from "./modules/menu.js";
import { wish } from "./modules/wish.js";
import { dropdown, language } from "./modules/dropdown.js";
import reset from "./modules/reset.js";
import {
  filterSelector,
  closeFilterSelector,
  sortSelector,
  closeSortSelector,
} from "./modules/moveUp.js";
import displayProduct from "./modules/displayProduct.js";

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

var start = 0;
var end = 3;

function reachLoadMore(destinationClass) {
  let destination = document.querySelector(destinationClass);

  let observer = new IntersectionObserver(
    function (entries) {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          start += 3;
          end += 3;
          // setTimeout(loadProducts(), 3000);
          loadProducts();
        }
      });
    },
    {
      threshold: 1,
    }
  );

  observer.observe(destination);
}

reachLoadMore(".loadMore");

const loadProducts = async () => {
  try {
    const res = await fetch("src/product.json");
    let products = await res.json();
    var sliced = products.slice(start, end);
    displayProducts(sliced);
    // filteringProduct(products);
  } catch (err) {
    console.log(err);
  }
};
loadProducts();

let filter = document.querySelector(".filter");

function hideFilter(destinationClass) {
  let destination = document.querySelector(destinationClass);
  console.log("hideFilter", destination)
  let observer = new IntersectionObserver(function (entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        filter.classList.add("hide");
      } else {
        filter.classList.remove("hide");
      }
    });
  });

  observer.observe(destination);
}

hideFilter("#header");
hideFilter("#footer");

// function filteringProduct(products) {
//   // console.log('all products', products);
//   products.map((product, index) => {
//     // console.log(index, ": dealtype", product.dealType)
//     // console.log(index, ": price", product.price.new)
//     const typeContain = product.dealType.map(deal => deal.type);
//     const filterPromoConditions = [];
//     const filterPriceConditions = [];
//     // click apply
//     const applyFilter = document.querySelector(".js-apply-filter");
//     // get all checkbox include in conditions
//     applyFilter.addEventListener("click", function () {
//       const promos = document.querySelectorAll(
//         ".js-filter-promo-checkbox input[type=checkbox]:checked"
//       );
//       promos.forEach((promo) => filterPromoConditions.push(promo.value));
//       // console.log("promo filter", filterPromoConditions);

//       filterPromo(typeContain, filterPromoConditions)
//       const prices = document.querySelectorAll(
//         ".js-filter-price-checkbox input[type=checkbox]:checked"
//       );
//       prices.forEach((price) => filterPriceConditions.push(price.value));
//       // console.log("price filter", filterPriceConditions);
//       filterPrice(product.price.new, filterPriceConditions);
//     });
//   })
// }
const productList = document.querySelector(".js-product-list");
const displayProducts = (products) => {
  products.map((product, index) => {
    // console.log("product.id", product.id)
    const currentProduct = displayProduct(product);
    console.log("currentProduct", currentProduct);
    productList.appendChild(currentProduct);
  });
};

// const dealType = [{ type: "new" }, { type: "discount" }, { type: "bundle" }];
// var allTypes = dealType.map((type) => type.type);

// const conditions = ["new", "discount"];

// console.log(
//   "check",
//   conditions.every((condition) => allTypes.includes(condition))
// );

/* Keep track filterConditions
   if( FilterConditions is empty) => loadProduct()
   else filterProduct with FilterConditions
   display product filtered
*/

// function filterPromo(item, conditions) {
//   // console.log('filter item: ', item)
//   if (conditions.every(condition => item.includes(condition))) {
//     return item;
//   };
// }

// function filterPrice(item, conditions){
//   console.log('price item', item);
// }

var cart = document.querySelector(".js-cart");
var hasItem = document.querySelector(".js-hasItem");
var numberInCart = document.querySelector(".js-number-cart");
let numberCart = hasItem.getElementsByClassName("cart__item").length;
numberInCart.innerHTML = `${numberCart}`;

var numberInWish = document.querySelector('.js-number-wish');
let numberWish = document.querySelectorAll('.heart-active').length;
numberInWish.innerHTML =`${numberWish}`;

cart.addEventListener("click", function () {
  if (cart.classList.contains("cart-active")) {
    cart.classList.remove("cart-active");
  } else {
    cart.classList.add("cart-active");
  }
});

var buttonOpenCartPage = document.querySelector(".js-open-cartpage");
var buttonCloseCartPage = document.querySelector(".js-close-cartpage");
var cartpage = document.querySelector(".js-cartpage");
buttonOpenCartPage.addEventListener("click", function () {
  cartpage.classList.add("active-cartpage");
});
buttonCloseCartPage.addEventListener("click", function () {
  cartpage.classList.remove("active-cartpage");
});