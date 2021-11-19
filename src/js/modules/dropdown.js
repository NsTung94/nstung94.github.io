export default class Dropdown {
  dropdown() {
    let dropdown = document.querySelectorAll('.js-dropdown-menu');
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
  cartPopUp(){
    var cartIcon = document.querySelector('.js-cart');
    cartIcon.addEventListener('click', function(){
      console.log('clicked', cartIcon.classList.add('cart-active'));
      if (cartIcon.classList.contains('cart-active')){
        cartIcon.classList.remove('cart-active');
        // console.log('removed')
      }else{
        cartIcon.classList.add('cart-active');
        // console.log("add", cartIcon);
      }
    })
    
  }
}

const dropdown = new Dropdown();
dropdown.dropdown();
dropdown.language();
dropdown.cartPopUp();
