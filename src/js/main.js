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
import addCart from "./modules/addCart.js";

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
          setTimeout(loadProducts(),3000);
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
  } catch (err) {
    console.log(err);
  }
};
loadProducts();

const productList = document.querySelector(".js-product-list");

const displayProducts = (products) => {
  products.map((product, index) => {
    // console.log("product.id", product.id)
    const currentProduct = displayProduct(product);
    // console.log("currentProduct", currentProduct);
    productList.appendChild(currentProduct);
  });
};

const dealType = [{ type: "new" }, { type: "discount" }, { type: "bundle" }];
var allTypes = dealType.map((type) => type.type);

const conditions = ["new", "discount"];

console.log(
  "check",
  conditions.every((condition) => allTypes.includes(condition))
);

/* Keep track filterConditions 
   if( FilterConditions is empty) => loadProduct()
   else filterProduct with FilterConditions
   display product filtered
*/
const filterPromoConditions = [];
const filterPriceConditions = [];


const applyFilter = document.querySelector(".js-apply-filter");
applyFilter.addEventListener("click", function () {
  const promos = document.querySelectorAll(
    ".js-filter-promo-checkbox input[type=checkbox]:checked"
  );
  console.log("promos", promos);
  promos.forEach((promo) => filterPromoConditions.push(promo.value));
  console.log("promo filter", filterPromoConditions);

  const prices = document.querySelectorAll(
    ".js-filter-price-checkbox input[type=checkbox]:checked"
  );
  console.log("prices", prices);
  prices.forEach((price) => filterPriceConditions.push(price.value));
  console.log("price filter", filterPriceConditions);
});
