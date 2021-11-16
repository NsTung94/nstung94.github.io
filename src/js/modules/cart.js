var cart = document.querySelector(".js-cart");
var cartButton = document.querySelector(".js-cart-open");

cartButton.addEventListener("click", function () {
  if (cart.classList.contains("cart-active")) {
    cart.classList.remove("cart-active");
  } else {
    cart.classList.add("cart-active");
  }
  var hasItem = document.querySelector(".js-hasItem");
  console.log(hasItem);

  console.log("ok ok", hasItem.querySelectorAll(".cart-item").length);
});
