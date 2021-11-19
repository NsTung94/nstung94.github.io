class Cart {
  openPriceCart() {
    var openSubPrice = document.querySelector(".js-open-sub");
    var closeSubPrice = document.querySelector(".js-close-sub");
    var subPrice = document.querySelector(".js-sub");

    openSubPrice.addEventListener("click", function () {
      subPrice.classList.add("expand");
      openSubPrice.classList.add("hide");
    });
    closeSubPrice.addEventListener("click", function () {
      subPrice.classList.remove("expand");
      openSubPrice.classList.remove("hide");
    });
  }
}

