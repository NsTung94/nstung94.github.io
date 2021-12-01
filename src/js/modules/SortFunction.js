class SortFunction {
    constructor() {
      this.openSortSelector();
      this.closeSortSelector();
    }
  
    openSortSelector() {
      let btn = document.querySelector(".js-sort-open");
      let sortPopup = document.querySelector(".js-sort-selector");
      let sortOption = document.querySelectorAll('.js-sort-option');
      btn.addEventListener("click", function () {
        if (sortPopup.classList.contains("active")) {
          sortPopup.classList.remove("active");
        //   sortPopup.style.height = '0';
        } else {
          sortPopup.classList.add("active");
        //   sortPopup.style.height = `${sortOption.length * 40}px`;
        }
      });
    }
    closeSortSelector() {
      let btns = document.querySelectorAll(".js-sort-close");
      let sortPopup = document.querySelector(".js-sort-selector");
      btns.forEach(function (btn) {
        btn.addEventListener("click", function () {
          sortPopup.classList.remove("active");
        //   sortPopup.style.height = 0;

        });
      });
    }
  }
  
  export default new SortFunction();
  