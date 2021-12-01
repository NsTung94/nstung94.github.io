class FilterSortFunction {
  constructor() {
    this.openFilterSelector();
    this.closeFilterSelector();
    this.resetFilterSelection();
  }

  openFilterSelector() {
    let button = document.querySelector(".js-selector-open");
    let selectorPopup = document.querySelector(".js-selector");
    button.addEventListener("click", function () {
      selectorPopup.classList.add("active-selector");
    });
  }
  closeFilterSelector() {
    let buttons = document.querySelectorAll(".js-selector-close");
    let selectorPopup = document.querySelector(".js-selector");
    buttons.forEach(function (btn) {
      btn.addEventListener("click", function () {
        selectorPopup.classList.remove("active-selector");
      });
    });
  }
  resetFilterSelection() {
    document.querySelectorAll(".js-reset-selector").forEach(function (item) {
      item.addEventListener("click", function () {
        document
          .querySelectorAll(".js-checkbox input[type=checkbox]:checked")
          .forEach(function (checkBox) {
            checkBox.checked = false;
          });
      });
    });
  }
}

export default new FilterSortFunction();
