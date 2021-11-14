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
