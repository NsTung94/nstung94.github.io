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
  countWish() {
    var numberInWish = document.querySelector(".js-number-wish");
    let numberWish = document.querySelectorAll(".heart-active").length;
    numberInWish.innerHTML = `${numberWish}`;

    if (numberCart == 0) {
      document.querySelectorAll(".js-hide-on-none").forEach(function (item) {
        item.classList.add("hide");
      });
    }

    cart.addEventListener("click", function () {
      if (cart.classList.contains("cart-active")) {
        cart.classList.remove("cart-active");
      } else {
        cart.classList.add("cart-active");
      }
    });
  }
}

const wish = new Wish();
wish.wish();
