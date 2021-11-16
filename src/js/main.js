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

let cartIcon = document.querySelector('.js-cart');

cartIcon.addEventListener('click', function(){
    if (cartIcon.classList.contains('cart-active')){
        cartIcon.classList.remove('cart-active')
    }else {
        cartIcon.classList.add('cart-active');
    }

})

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
    // console.log("currentProduct", currentProduct);
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

function filterPromo(item, conditions) {
  // console.log('filter item: ', item)
  if (conditions.every(condition => item.includes(condition))) {
    return item;
  };
}

function filterPrice(item, conditions){
  console.log('price item', item);
}


