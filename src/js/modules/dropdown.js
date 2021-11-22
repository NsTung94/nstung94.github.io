export default class Dropdown {
  dropdown() {
    let dropdown = document.querySelectorAll(".js-dropdown-menu");
    dropdown.forEach(function (item) {
      let button = item.querySelector(".js-dropdown-button");
      let content = item.querySelector(".js-dropdown-content");
      button.addEventListener("click", function () {
        if (item.classList.contains("show")) {
          item.classList.remove("show");
          content.style.height = "0px";
        } else {
          item.classList.add("show");
          let number = content.querySelectorAll(".js-checkbox").length;
          let displayHeight = number * 40;
          content.style.height = displayHeight + "px";
        }
      });
    });
  }
  language() {
    let language = document.querySelector(".js-language");
    let languageDropdown = document.querySelector(".js-language-dropdown");
    language.addEventListener("click", function () {
      if (languageDropdown.classList.contains("hide")) {
        // languageDropdown.style.display = 'flex';
        languageDropdown.classList.remove("hide");
      } else {
        languageDropdown.classList.add("hide");
      }
    });

    let sliderItems = document.querySelectorAll(".js-slider-item");

    sliderItems.forEach(function (item) {
      item.addEventListener("click", function () {
        sliderItems.forEach((item) => item.classList.remove("selected"));
        item.classList.add("selected");
      });
    });
  }
  cartPopUp() {
    let cartPopup = document.querySelector('.js-cart');
    let cartButton = document.querySelector('.js-cart-open');
   
    cartButton.addEventListener('click', function(){
      if (cartPopup.classList.contains('cart-active')){
        cartPopup.classList.remove('cart-active');
      }else{
        cartPopup.classList.add('cart-active');
      }
    })
  }
}

// const cartPopups = [...document.getElementsByClassName('.js-cart')];

// window.addEventListener('click', ({ target }) => {
//   const popup = target.closest('.js-cart');
//   const clickedOnClosedPopup = popup && !popup.classList.contains('cart-active');
  
//   cartPopups.forEach(p => p.classList.remove('cart-active'));
  
//   if (clickedOnClosedPopup) popup.classList.add('cart-active');  
// });

const dropdown = new Dropdown();
dropdown.dropdown();
dropdown.language();
dropdown.cartPopUp();
