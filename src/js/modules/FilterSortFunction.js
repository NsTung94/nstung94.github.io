class FilterSortFunction {
  constructor() {
    this.filterSelector();
    this.closeFilterSelector();
    this.sortSelector();
    this.closeSortSelector();
    this.resetFilterSelection();
  }

  filterSelector() {
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
  sortSelector() {
    let btn = document.querySelector(".js-sort-open");
    let sortPopup = document.querySelector(".js-sort-selector");
    btn.addEventListener("click", function () {
      if (sortPopup.classList.contains("active")) {
        sortPopup.classList.remove("active");
      } else {
        sortPopup.classList.add("active");
      }
    });
  }
  closeSortSelector() {
    let btns = document.querySelectorAll(".js-sort-close");
    let sortPopup = document.querySelector(".js-sort-selector");
    btns.forEach(function (btn) {
      btn.addEventListener("click", function () {
        sortPopup.classList.remove("active");
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

// const filterSort  = new FilterSortFunction();
// filterSort.filterSelector();
// filterSort.closeFilterSelector();
// filterSort.sortSelector();
// filterSort.closeSortSelector();
// filterSort.resetFilterSelection();
