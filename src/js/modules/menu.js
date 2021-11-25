class Menu {
  constructor(){
    this.toggleMenu()
    this.openSubMenu()
  }
  toggleMenu() {
    // const menuBtn = document.querySelector(".js-open-menu");
    const menuBtn = document.querySelector('.js-open-menu');
    const menu = document.querySelector(".menu");
    menuBtn.addEventListener("click", function () {
      menu.classList.add("showMenu");
    });
    const closeMenu = document.querySelector(".js-close-menu");
    closeMenu.addEventListener("click", function () {
      menu.classList.remove("showMenu");
    });
  }
  openSubMenu() {
    let allSubMenuButton = document.querySelectorAll(".js-open-submenu");
    allSubMenuButton.forEach(function (key) {
      const menuToOpen = key.querySelector(".js-submenu");
      // const btnClose = menuToOpen.querySelector('.js-close-submenu');
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
}

export default new Menu();
