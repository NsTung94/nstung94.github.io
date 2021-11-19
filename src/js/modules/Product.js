import "./wish.js";

class Product {
  loadProducts = async () => {
    try {
      var productList = document.querySelector(".js-product-list");
      const res = await fetch("src/product.json");
      let products = await res.json();
      // var sliced = products.slice(start, end);
      // displayProducts(products);
      console.log("products id", products[0].id);
      products.map((product) => {
        productList.append(displayProduct(product));
      });
    } catch (err) {
      console.log(err);
    }
  };
}

const product = new Product();

product.loadProducts();
// product.purchaseProduct();

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
  image.setAttribute("data-picture", product.price);
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

// var addFunction = document.querySelectorAll('.js-add-cart');
// addFunction.forEach(function(e){
//   e.addEventListener('click', function(){
//     console.log('add');
//     let product = e.target.parentElement.parentElement;
//     getProductInfo(product);
//   })

// })

function purchaseProduct(e) {
  var button = document.querySelectorAll(".js-add-cart");
  button.forEach(function (addBtn) {
    // console.log('add ne', addBtn)
    addBtn.addEventListener("click", function (e) {
      let product = e.target.parentElement.parentElement;
      getProductInfo(product);
      loadCartPopup();
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
  console.log("product", product);

  let productInfo = {
    imgSrc: product
      .querySelector(".product__item-img img")
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
  console.log("what this", product.querySelector(".product__item-price--old"));

  if (product.querySelector(".product__item-price--old") !== null) {
    productInfo.oldprice = product
      .querySelector(".product__item-price--old")
      .getAttribute("data-old-price");
  }
  console.log(productInfo);
  addToCartList(productInfo);
  saveProductInStorage(productInfo);
}

// add the selected product to the cart list
function addToCartList(product) {
  const cartList = document.querySelector(".cart__container");
  const cartItem = document.createElement("div");
  cartItem.classList.add("cart__item");
  cartItem.setAttribute("data-id", `${product.id}`);
  cartItem.innerHTML = `
    <div class="cart__item-img">
    <img src="${product.imgSrc}" alt="" />
  </div>
  <div class="cart__container-detail">
    <div class="cart__item-name">
      ${product.name}
    </div>
    <div class="cart__item-code">${product.code}</div>
    <div class="cart__item-quantity disable">
    <div class="cartpage__product-quantity">
    <div
      class="btn cartpage-box cartpage__product-quantity--decrease"
    ></div>
    <div
      class="btn cartpage-box cartpage__product-quantity--number"
    >
      1
    </div>
    <div
      class="btn cartpage-box cartpage__product-quantity--increase"
    ></div>
  </div>
      
      
    </div>
  </div>
  <div class="cart__container-decision">
    <div class="cart__item-price">
      ${product.price}
    </div>
    <div class="cart__item-price price-old">
        ${product.oldPrice}
    </div>
    <div class="cart__item-delete--big">
      <img
        src="./src/images/icon/delete-icon.svg"
        alt=""
      />
    </div>
    <div class="cart__item-delete--small">
      <img
        src="./src/images/icon/delete-icon.svg"
        alt=""
      />
    </div>
  </div>
    `;
  cartList.appendChild(cartItem);
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
    cartItemID = 1; // if there is no any product in the local storage
  } else {
    cartItemID = products[products.length - 1].id;
    cartItemID++;
    // else get the id of the last product and increase it by 1
  }
  products.forEach((product) => addToCartList(product));
}

// get number of item
function findCartInfo() {
  let products = getProductFromStorage();
  return {
    productCount: products.length,
  };
}

// delete product from cart list and local storage
function deleteProduct(e) {
  let cartItem;
  if (e.target.tagName === "BUTTON") {
    cartItem = e.target.parentElement;
    cartItem.remove(); // this removes from the DOM only
  } else if (e.target.tagName === "I") {
    cartItem = e.target.parentElement.parentElement;
    cartItem.remove(); // this removes from the DOM only
  }

  let products = getProductFromStorage();
  let updatedProducts = products.filter((product) => {
    return product.id !== parseInt(cartItem.dataset.id);
  });
  localStorage.setItem("products", JSON.stringify(updatedProducts));
}
