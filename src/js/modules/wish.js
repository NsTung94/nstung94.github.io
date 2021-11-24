// click heart to add wishlist

class Wish {
  constructor(){
    this.wish()
  }
  wish() {
    // let wishCount = document.querySelector(".js-number-wish");
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
export default new Wish();

