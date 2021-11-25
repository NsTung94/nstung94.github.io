class Cart {
  constructor(){
    this.openPriceCart();
  }
  openPriceCart() {
    const openSubPrice = document.querySelector(".js-open-sub");
    const closeSubPrice = document.querySelector(".js-close-sub");
    const subPrice = document.querySelector(".js-sub");

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


export default new Cart();

