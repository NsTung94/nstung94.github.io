
export function openMenu(button){
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


// let allSubMenuButton = document.querySelectorAll(".js-open-submenu");
// allSubMenuButton.forEach(function (key) {
//   var menuToOpen = key.querySelector(".subMenu");
//   var btn = key.querySelector(".js-close-submenu");
//   btn.addEventListener("click", function () {
//     menuToOpen.classList.add("active");
//     var closeSubMenuBtn = document.querySelector(".js-open-submenu .active");
//     if (closeSubMenuBtn !== null) {
//       closeSubMenuBtn.addEventListener("click", function () {
//         closeSubMenuBtn.classList.remove("active");
//       });
//     }
//   });
// });
