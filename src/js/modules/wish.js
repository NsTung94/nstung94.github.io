// click heart to add wishlist

let wishCount = document.querySelector('.js-number-wish');

export function wish() {
  
  let hearts = document.querySelectorAll(".js-heart-button");
  hearts.forEach(function (item) {
    item.addEventListener('click', function () {
      if (item.classList.contains('heart-active')) {
        item.classList.remove('heart-active');
      } else {
        item.classList.add('heart-active');
      }
    })
  })
}