class DropDownMenu {
  constructor() {
    this.openDropDownList();
    this.openLanguageMenu();
  }
  openDropDownList() {
    let dropdownMenu = document.querySelectorAll(".js-dropdown-menu");
    dropdownMenu.forEach(function (item) {
      let buttonOpenDropDown = item.querySelector(".js-dropdown-button");
      let dropDownContent = item.querySelector(".js-dropdown-content");
      buttonOpenDropDown.addEventListener("click", function () {
        if (item.classList.contains("show")) {
          buttonOpenDropDown.classList.remove('hide-before');
          item.classList.remove("show");
          dropDownContent.style.height = "0px";
        } else {
          buttonOpenDropDown.classList.add('hide-before');
          item.classList.add("show");
          let number = dropDownContent.querySelectorAll(".js-checkbox").length;
          let displayHeight = number * 40;
          dropDownContent.style.height = displayHeight + "px";
        }
      });
    });
  }
  openLanguageMenu() {
    let language = document.querySelector(".js-language");
    let languageDropdown = document.querySelector(".js-language-dropdown");
    language.addEventListener("toggle", function () {
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
  
}

export default new DropDownMenu();

