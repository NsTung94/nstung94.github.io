class Menu {
  toggleMenu() {
    console.log('toggle')
    // var menuBtn = document.querySelector(".js-open-menu");
    var menuBtn = document.querySelector('.js-open-menu');
    var menu = document.querySelector(".menu");
    menuBtn.addEventListener("click", function () {
      menu.classList.add("showMenu");
    });
    var closeMenu = document.querySelector(".js-close-menu");
    closeMenu.addEventListener("click", function () {
      menu.classList.remove("showMenu");
    });
  }
  openSubMenu() {
    let allSubMenuButton = document.querySelectorAll(".js-open-submenu");
    allSubMenuButton.forEach(function (key) {
      var menuToOpen = key.querySelector(".js-submenu");
      // var btnClose = menuToOpen.querySelector('.js-close-submenu');
      key.addEventListener("click", function () {
        if (menuToOpen.classList.contains("active")) {
          // btnClose.addEventListener('click', function(){
          menuToOpen.classList.remove("active");
          // })
        } else {
          menuToOpen.classList.add("active");
        }
      });
    });
  }
 
  openCartPopUp(){
    var cartIcon = document.querySelector('.js-cart')
    var button = document.querySelector('.js-cart-open');
    cartIcon.addEventListener('click', function(){
      if (cartIcon.classList.contains('cart-active')){
        cartIcon.classList.remove('cart-active');
      }else{
        cartIcon.classList.add('cart-active');
      }
    })
  }
}

const menu = new Menu();
menu.toggleMenu();
menu.openSubMenu();
menu.openCartPopUp();