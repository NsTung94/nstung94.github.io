import "./Wish.js";

const pageSize = 3;
let currentProductItems = [];
// let productItems = []
const _productItemsKey = "_productKeyItem";
const _cartItemsKey = "_cartItemsKey";
let startIndex = 0;
export function Product(){
  var productItems = [];
  this.loadProducts = async () => {
    try {
      const res = await fetch("src/product.json");
      // productItems = await res.json();
      const productFetch = await res.json();
      // console.log(productFetch);
      productItems = productFetch;
      // console.log('waaaaa',productItems);
      this.loadMore(productItems)
      // this.loadMore(this.productItems)
    } catch (err) {
      console.log(err);
    }
  };
 
  this.loadMore = function(products) {
    //TODO: load more products
    let size = startIndex + pageSize
    // Start size
    currentProductItems = products.slice(startIndex, size);
    // displayProduct(currentProductItems);
    console.log("currentProductItems", currentProductItems)
    currentProductItems.map(item => displayProduct(item));
    var loadMoreButton = document.querySelector(".js-load-more");
    loadMoreButton.addEventListener("click", function () {
      startIndex += pageSize;
      productLoadMore = products[(startIndex, size)];
      currentProductItems.push(productLoadMore);
    });
    return this.currentProductItems
  }

}

const product = new Product();
product.loadProducts();
product.loadMore;

function displayProduct(product) {
  // console.log(product);
  // Product Item Container
  var productItem = document.createElement("div");
  productItem.classList.add("product__item");
  productItem.setAttribute("data-id", product.id);

  // Heart Button
  var heartBtn = document.createElement("div");
  heartBtn.classList.add("product__item-heart", "js-heart-button");

  // List Tag DealType
  var tag = document.createElement("div");
  tag.classList.add("item", "product__item-tag");
  var tagString = [];
  for (var i = 0; i < product.dealType.length; i++) {
    if (product.dealType[i].type == "new") {
      tagString.push('<div class="tag tag--new">new</div>');
    }
    if (product.dealType[i].type == "discount") {
      tagString.push('<div class="tag tag--discount">sale</div>');
    }
    if (product.dealType[i].type == "bundle") {
      tagString.push('<div class="tag tag--bundle">bundle</div>');
    }
    if (product.dealType[i].type == "gift") {
      tagString.push(
        '<div class="tag tag--gift"><img src="./src/images/icon/gift.png"/>free gift</div>'
      );
    }
  }
  tag.innerHTML = tagString.join("");

  // Product Image
  var image = document.createElement("div");
  image.classList.add("product__item-img");
  image.setAttribute("data-picture", product.picture);
  var itemImage = document.createElement("img");
  itemImage.setAttribute("src", product.picture);
  image.appendChild(itemImage);

  // Product Detail
  var detail = document.createElement("div");
  detail.classList.add("item", "product__item-detail");
  var code = document.createElement("div");
  code.classList.add("product__item-code");
  code.setAttribute("data-code", product.code);
  code.innerHTML = `${product.code}`;
  var name = document.createElement("div");
  name.classList.add("product__item-name");
  name.setAttribute("data-name", product.name);
  name.innerHTML = `${product.name}`;
  var review = document.createElement("div");
  review.classList.add("product__item-rate");
  review.innerHTML = `
      <div class="product__item-rate--star">
          <img src="./src/images/icon/star.png" alt="" />
      </div>
      <div class="product__item-rate--number">
          ${product.review} Reviews
      </div>
      `;

  detail.appendChild(code);
  detail.appendChild(name);
  detail.appendChild(review);

  // Product Price
  var price = document.createElement("div");
  price.classList.add("item", "product__item-price");
  var priceNumber = [];
  if (product.price.old == undefined) {
    var oldPrice = document.createElement("div");
    oldPrice.style.display = "none";
  } else {
    var oldPrice = document.createElement("div");
    oldPrice.setAttribute("data-old-price", product.price.old);
    oldPrice.classList.add("product__item-price--old");
    oldPrice.innerHTML = `${product.price.old.toLocaleString("de")}`;
  }
  var newPrice = document.createElement("div");
  newPrice.setAttribute("data-new-price", product.price.new);
  newPrice.classList.add("product__item-price--new");
  newPrice.innerHTML = `${product.price.new.toLocaleString("de")}`;
  priceNumber.push(oldPrice, newPrice);

  price.appendChild(oldPrice);
  price.appendChild(newPrice);

  // Product Suggestion
  var suggestion = document.createElement("div");
  suggestion.classList.add(
    "item",
    "product__item-suggestion",
    "hide-on-desktop"
  );
  suggestion.innerHTML = `
            <div class="product__item-interest">
                <div class="product__item-interest--number">${product.interest} %</div>
            </div>
            <div class="product__item-payment">
                <div class="product__item-payment--money">
                    ${product.payment} VND/month
                </div>
                <div class="product__item-payment--due">for 6 months</div>
            </div>
      `;

  // Product Description
  var description = document.createElement("ul");
  description.classList.add("item", "product__item-description");
  const listDescription = product.description
    .map((item) => `<li>${item.value}</li>`)
    .join("");
  description.innerHTML += listDescription;

  // Product Action
  var action = document.createElement("div");
  action.classList.add("item", "product__item-action");
  action.innerHTML = `
  <button class="btn btn--primary product__item-action--add js-add-cart">
      add to cart
  </button>
  <button class="btn product__item-action--research">
      learn more
  </button>
  `;
  purchaseProduct();

  var compare = document.createElement("div");
  compare.classList.add("product__item-compare", "hide-on-mobile");
  compare.innerHTML = `
          <label class="checkBox js-compare-checkbox">
            <input type="checkbox" class="" />
            <span class="checkmark checkmark--compare"></span>
            <span class="checkbox__label product__item-compare-label">
              Add to Compare</span
            >
          </label>
      `;

  // Append to Product Item Container for display
  productItem.appendChild(heartBtn);
  productItem.appendChild(tag);
  productItem.appendChild(image);
  productItem.appendChild(detail);
  productItem.appendChild(price);
  productItem.appendChild(suggestion);
  productItem.appendChild(description);
  productItem.appendChild(action);
  productItem.appendChild(compare);

  return productItem;
}

function purchaseProduct(e) {
  var button = document.querySelectorAll(".js-add-cart");
  button.forEach(function (addBtn) {
    addBtn.addEventListener("click", function (e) {
      console.log("event", e);
      e.preventDefault();
      const productId = e.target.getAttribute("data-id");
      const productItems = localStorage.getItem(_productItemsKey);
      const productItem = productItems.find(
        (product) => product.id === productId
      );

      const existingCartItems = localStorage.getItem(_cartItemsKey);

      const existingProductIndex = existingCartItems.findIndex(
        (product) => product.id === productId
      );
      const newProductItemsToCart = [...existingCartItems];
      if (existingProductIndex !== -1) {
        //TODO update current product quantity
      } else {
        newProductItemsToCart.push(productItem);
      }

      localStorage.setItem(_cartItemsKey, newProductItemsToCart);

      // let product = e.target.parentElement.parentElement;
      // getProductInfo(product);
      // loadCartPopup();
    });
  });
}

// load cart popup
function loadCartPopup() {
  var cart = document.querySelector(".js-cart");
  var hasItem = document.querySelector(".js-hasItem");
  var numberInCart = document.querySelector(".js-number-cart");
  let numberCart = hasItem.getElementsByClassName("cart__item").length;
  numberInCart.innerHTML = `${numberCart}`;
}

// get product info after add to cart button click
function getProductInfo(product) {
  // console.log("product", product);

  let productInfo = {
    cartId: product.getAttribute("data-id", product.id),
    imgSrc: product
      .querySelector(".product__item-img")
      .getAttribute("data-picture"),
    name: product
      .querySelector(".product__item-name")
      .getAttribute("data-name"),
    code: product
      .querySelector(".product__item-code")
      .getAttribute("data-code"),
    price: product
      .querySelector(".product__item-price--new")
      .getAttribute("data-new-price"),
  };

  if (product.querySelector(".product__item-price--old") !== null) {
    productInfo.oldPrice = product
      .querySelector(".product__item-price--old")
      .getAttribute("data-old-price");
  }

  // console.log("new product to cart", productInfo);
  addToCartList(productInfo);
  saveProductInStorage(productInfo);
}

// add the selected product to the cart list
function addToCartList(product) {
  // console.log("product", product)
  const cartList = document.querySelector(".cart__container");
  const cartItem = document.createElement("div");
  cartItem.classList.add("cart__item");
  cartItem.setAttribute("data-id", `${product.id}`);

  const cartImage = document.createElement("div");
  cartImage.classList.add("cart__item-img");
  const cartImageSrc = document.createElement("img");
  cartImageSrc.setAttribute("src", product.imgSrc);
  // item image
  cartImage.appendChild(cartImageSrc);

  const cartItemDetail = document.createElement("div");
  cartItemDetail.classList.add("cart__container-detail");

  // item name
  const cartItemName = document.createElement("div");
  cartItemName.classList.add("cart__item-name");
  cartItemName.innerHTML = `${product.name}`;

  // item code
  const cartItemCode = document.createElement("div");
  cartItemCode.classList.add("cart__item-code");
  cartItemCode.innerHTML = `${product.code}`;

  // cart item quantity
  const cartItemQuantity = document.createElement("div");
  cartItemQuantity.classList.add("cartpage__product-quantity");
  const cartItemQuantityDec = document.createElement("div");
  cartItemQuantityDec.classList.add(
    "btn",
    "cartpage-box",
    "cartpage__product-quantity--decrease"
  );
  const cartItemQuantityInc = document.createElement("div");
  cartItemQuantityInc.classList.add(
    "btn",
    "cartpage-box",
    "cartpage__product-quantity--increase"
  );
  const cartItemQuantityNumber = document.createElement("div");
  cartItemQuantityNumber.classList.add(
    "btn",
    "cartpage-box",
    "cartpage__product-quantity--number"
  );
  // need change to number of product same id
  cartItemQuantityNumber.innerHTML = `${1}`;

  cartItemQuantity.appendChild(cartItemQuantityDec);
  cartItemQuantity.appendChild(cartItemQuantityNumber);
  cartItemQuantity.appendChild(cartItemQuantityInc);

  cartItemDetail.appendChild(cartItemName);
  cartItemDetail.appendChild(cartItemCode);
  cartItemDetail.appendChild(cartItemQuantity);

  // cart decision
  const cartItemDecision = document.createElement("div");
  cartItemDecision.classList.add("cart__container-decision");
  const cartPriceNew = document.createElement("div");
  cartPriceNew.classList.add("cart__item-price");
  // console.log('product.price', product.price.toLocaleString("de"))

  cartPriceNew.innerHTML = `${product.price.toLocaleString("de")}`;
  const cartPriceOld = document.createElement("div");
  cartPriceOld.classList.add("cart__item-price", "price-old");
  if (product.oldPrice !== undefined) {
    cartPriceOld.innerHTML = `${product.oldPrice}`;
  }
  const cartDelete = document.createElement("div");
  cartDelete.classList.add("cart__item-delete--big");
  cartDelete.innerHTML = `
      <img
        src="./src/images/icon/delete-icon.svg"
        alt=""
      />`;

  cartItemDecision.appendChild(cartPriceNew);
  cartItemDecision.appendChild(cartPriceOld);
  cartItemDecision.appendChild(cartDelete);

  cartItem.appendChild(cartImage);
  cartItem.appendChild(cartItemDetail);
  cartItem.appendChild(cartItemDecision);

  cartList.appendChild(cartItem);
  return cartList;
}

// save the product in the local storage
function saveProductInStorage(item) {
  let products = getProductFromStorage();
  products.push(item);
  localStorage.setItem("products", JSON.stringify(products));
}

// get all the products info if there is any in the local storage
function getProductFromStorage() {
  return localStorage.getItem("products")
    ? JSON.parse(localStorage.getItem("products"))
    : [];
  // returns empty array if there isn't any product info
}

// load carts product
function loadCart() {
  let products = getProductFromStorage();
  if (products.length < 1) {
    console.log("okie"); // if there is no any product in the local storage
  } else {
    console.log("...");
  }
  products.forEach((product) => addToCartList(product));
}
