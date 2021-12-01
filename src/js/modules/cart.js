class Cart {
  constructor(){
    this.openPriceCart();
  }
  openPriceCart() {
    const buttonOpenSubPrice = document.querySelector(".js-open-sub");
    const buttonCloseSubPrice = document.querySelector(".js-close-sub");
    const subPrice = document.querySelector(".js-sub");

    buttonOpenSubPrice.addEventListener("click", function () {
      subPrice.classList.add("expand");
      buttonOpenSubPrice.classList.add("hide");
    });
    buttonCloseSubPrice.addEventListener("click", function () {
      subPrice.classList.remove("expand");
      buttonOpenSubPrice.classList.remove("hide");
    });
  }
}


export default new Cart();

