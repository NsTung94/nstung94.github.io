function purchaseProduct(e) {
  if (e.target.classList.contains("js-add-cart")) {
    let product = e.target.parentElement.parentElement;
    getProductInfo(product);
  }
}

// get product info after add to cart button click
function getProductInfo(product) {
  let productInfo = {
    id: cartItemID,
    imgSrc: product.querySelector(".product__item-img img").src,
    name: product.querySelector(".product__item-name").textContent,
    code: product.querySelector(".product__item-code").textContent,
    price: product.querySelector(".product__item-price--new").textContent,
    oldprice: product.querySelector(".product__item-price--old").textContent,
  };
  cartItemID++;
  addToCartList(productInfo);
  saveProductInStorage(productInfo);
}

// add the selected product to the cart list
function addToCartList(product) {
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
    <div class="cart__item-code">pq92-3bwf</div>
    <div class="cart__item-quantity disable">
      <div
        class="
          quantity-button
          cart__item-quantity--button
        "
      >
        <span>-</span>
      </div>
      <div
        class="
          quantity-button
          cart__item-quantity--number
        "
      >
        
      </div>
      <div
        class="
          quantity-button
          cart__item-quantity--button
        "
      >
        <span>+</span>
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
  updateCartInfo();
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

  // calculate and update UI of cart info
  updateCartInfo();
}

// calculate total price of the cart and other info
function findCartInfo() {
  let products = getProductFromStorage();
  let total = products.reduce((acc, product) => {
    let price = product.price; // removing dollar sign
    return (acc += price);
  }, 0); // adding all the prices

  return {
    total: total.toFixed(2),
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
  localStorage.setItem("products", JSON.stringify(updatedProducts)); // updating the product list after the deletion
  updateCartInfo();
}
