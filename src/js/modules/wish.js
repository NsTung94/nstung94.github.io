// click heart to add wishlist

class Wish {
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

const wish = new Wish();
wish.wish();
