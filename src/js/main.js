import { openMenu, openSubMenu } from "./modules/menu.js";
import {wish} from './modules/wish.js';
import { dropdown, language } from "./modules/dropdown.js";
import reset from "./modules/reset.js";
import {
  filterSelector,
  closeFilterSelector,
  sortSelector,
  closeSortSelector,
} from "./modules/moveUp.js";

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

const loadProducts = async () => {
  try {
    const res = await fetch("src/product.json");
    let products = await res.json();
    displayProducts(products)
  } catch (err) {
    console.log(err);
  }
};
setTimeout(loadProducts, 3000);


const productList = document.querySelector(".js-product-list");

const displayProducts = (products) => {
  const htmlString = products
    .map((product, index) => {
      console.log("product:", index, " + ", product);
      return `
      <div class="product__item">
        <div class="product__item-heart js-heart-button">
          <img
            class="outline"
            src="./src/images/icon/heart-outline-icon.svg"
            alt=""
          />
          <img
            src="./src/images/icon/heart-filled-icon.svg"
            alt=""
            class="fill hide"
          />
        </div>
        <div class="item product__item-tag">
          <div class="tag tag--discount">sale</div>
          <div class="tag tag--gift">
            <img src="./src/images/icon/gift.png" alt="" />
            <span>free gift</span>
          </div>
        </div>
        <div class="item product__item-img placeholder">
          <img
            class="product__item-img--content lazy-observer"
            data-src="${product.picture}"
            alt=""
          />
        </div>
        <div class="item product__item-detail">
          <div class="product__item-code">${product.code}</div>
          <div class="product__item-name">
            ${product.name}
          </div>
          <div class="product__item-rate">
            <div class="product__item-rate--star">
              <img src="./src/images/icon/star.png" alt="" />
            </div>
            <div class="product__item-rate--number">${product.review} Reviews</div>
          </div>
        </div>
        <div class="item product__item-price">
          <div class="product__item-price--old">${product.price.old} đ</div>
          <div class="product__item-price--new">${product.price.new} đ</div>
        </div>
        <div class="item product__item-suggestion hide-on-desktop">
          <div class="product__item-interest">
            <div class="product__item-interest--number">${product.interest} %</div>
          </div>
          <div class="product__item-payment">
            <div class="product__item-payment--money">
              ${product.payment} VND/month
          </div>
          <div class="product__item-payment--due">for 6 months</div>
        </div>
      </div>
      <ul class="item product__item-description">
      </ul>
      <div class="item product__item-action">
        <button class="btn btn--primary product__item-action--add">
          add to cart
        </button>
        <button class="btn product__item-action--research">
          learn more
        </button>
      </div>
      <div class="product__item-compare hide-on-mobile">
        <label class="checkBox js-compare-checkbox">
          <input type="checkbox" class="" />
          <span class="checkmark checkmark--compare"></span>
          <span class="checkbox__label product__item-compare-label">
            Add to Compare</span
          >
        </label>
      </div>
  </div>
      
      `;
    })
    .join("");
  productList.innerHTML = htmlString;
};

// function init() {
//   // do something
//   document
//     .getElementsByClassName(".js-heart-button")
//     .addEventListener("click", function () {
//       // do something
//     });
// }

// for (var i = 0; i < 5; i++) {
//   document.body.appendChild('<div class="new-dom">New DOM</div>');
//   init();
// }

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

window.addEventListener("scroll", () => {
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

  if (clientHeight + scrollTop >= scrollHeight - 1000) {
    // show the loading animation
    showLoading();
  }
});

const loading = document.querySelector(".loading");
function showLoading() {
  loading.classList.add("show");

  // load more data
  setTimeout(loadProducts, 1000);
}
