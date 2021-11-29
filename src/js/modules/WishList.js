// click heart to add wishlist

class WishList {
  numberWish = 0;
  numberInWish = document.querySelector('.js-number-wish');
  constructor(){
    this.initWish()
  }

  initWish() {
   
    let hearts = document.querySelectorAll(".js-heart-button");
    hearts.forEach(function (item) {
      item.addEventListener("click", function () {
        if (item.classList.contains("heart-active")) {
          item.classList.remove("heart-active");
        } else {
          item.classList.add("heart-active");
        }
      });
    });
  }
 
}
export default new WishList();

