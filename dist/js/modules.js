/*! nstung94.github.io v1.0.0 | (c) 2021  | ISC License | git+https://github.com/NsTung94/nstung94.github.io.git */


// dropdown menu
export function dropdown(button){

    // let dropdown = document.querySelectorAll('.js-dropdown-menu');
    let dropdown = document.querySelectorAll(button);
    dropdown.forEach(function(item){
      let button = item.querySelector('.js-dropdown-button')
      let content = item.querySelector('.js-dropdown-content');
      button.addEventListener('click', function(){
        if (item.classList.contains('show')){
          item.classList.remove('show');
          content.style.height = "0px";      
        }
        else {
          item.classList.add('show');
          let number = content.querySelectorAll('.js-selector-checkbox').length;
          console.log("number is ", number);
          let displayHeight = number * 32;
          content.style.height = displayHeight + "px";
        }
      })
    })
}

export function language(){
  let language = document.querySelector('.js-language');
  let languageDropdown = document.querySelector('.js-language-dropdown');
  language.addEventListener('click', function(){
    if (languageDropdown.style.display == "none"){
      languageDropdown.style.display = 'flex';
    }
    else {
      languageDropdown.style.display = "none";
    }
  })
  
  let sliderItems = document.querySelectorAll('.js-slider-item');
  
  sliderItems.forEach(function(item){
    item.addEventListener('click', function(){
      sliderItems.forEach(item => item.classList.remove("selected"));
      item.classList.add('selected');
    })
  })
}

export function openMenu(button) {
  // var menuBtn = document.querySelector(".js-open-menu");
  var menuBtn = document.querySelector(button);
  var menu = document.querySelector(".menu");
  menuBtn.addEventListener("click", function () {
    menu.classList.add("showMenu");
  });
  var closeMenu = document.querySelector(".js-close-menu");
  closeMenu.addEventListener("click", function () {
    menu.classList.remove("showMenu");
    window.onscroll = function () {};
  });
}

export function openSubMenu() {
  let allSubMenuButton = document.querySelectorAll(".js-open-submenu");
  allSubMenuButton.forEach(function (key) {
    var menuToOpen = key.querySelector(".js-submenu");
    var btnClose = menuToOpen.querySelector('.js-close-submenu');
    key.addEventListener("click", function () {
      if (menuToOpen.classList.contains("active")) {
        // btnClose.addEventListener('click', function(){
          menuToOpen.classList.remove("active");
        // })
      } else {
        menuToOpen.classList.add('active');
      }
    });
  });
}

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
  let btns = document.querySelectorAll(".js-sort-close");
  let sortPopup = document.querySelector(".js-sort-selector");
  btns.forEach(function (btn) {
      btn.addEventListener("click", function () {
        sortPopup.classList.remove("active");
      });
  });
}

export default function reset() {
  document.querySelectorAll(".js-reset-selector").forEach(function (item) {
 
      item.addEventListener("click", function () {
        document
          .querySelectorAll(
            ".js-selector-checkbox input[type=checkbox]:checked"
          )
          .forEach(
            function(checkBox) {
              (checkBox.checked = false)
            } 
              
          );
      });
  });
}

// click heart to add wishlist
export function wish(button){
    // let hearts = document.querySelectorAll('.js-heart-button');
    let hearts = document.querySelectorAll(button);
    hearts.forEach(function(item){
      let unwish = item.querySelector('.outline'
      )
      let wish = item.querySelector('.fill');
      item.addEventListener('click', function(){
        console.log('wish', wish, 'style', wish.style)
          if (wish.style.display == 'none'){
            wish.style.display = "block";
            unwish.style.display = "none";
          }else{
            wish.style.display = "none";
            unwish.style.display = "block";
          }
      })
    })
}