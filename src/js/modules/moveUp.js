export function filterSelector() {
  let button = document.querySelector(".js-selector-open");

  let selectorPopup = document.querySelector(".js-selector");
  button.addEventListener("click", function () {
    selectorPopup.classList.add("active");
  });
}

export function closeFilterSelector() {
  let buttons = document.querySelectorAll(".js-selector-close");
  let selectorPopup = document.querySelector(".js-selector");
  buttons.forEach(function (btn) {
    btn.addEventListener("click", function () {
        selectorPopup.classList.remove("active");
    });
  });
}

export function sortSelector() {
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

export function closeSortSelector() {
  console.log('close?')
  let btns = document.querySelectorAll(".js-sort-close");
  let sortPopup = document.querySelector(".js-sort-selector");
  btns.forEach(function (btn) {
      btn.addEventListener("click", function () {
        sortPopup.classList.remove("active");
        console.log('closed')
      });
  });
}
