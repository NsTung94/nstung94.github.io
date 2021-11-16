// click heart to add wishlist


export function wish() {
  let wishCount = document.querySelector('.js-number-wish');
  var number = parseInt(wishCount.number, 10);
  let hearts = document.querySelectorAll(".js-heart-button");
  hearts.forEach(function (item) {
    item.addEventListener('click', function () {
      if (item.classList.contains('heart-active')) {
        item.classList.remove('heart-active');
        number = isNaN(number) ? 0 : number;
        number--;
        wishCount.number = number;
        wishCount.innerHTML = parseInt(number, 10);
      } else {
        item.classList.add('heart-active');
        number = isNaN(number) ? 0 : number;
        number++;
        wishCount.number = number;
        wishCount.innerHTML = parseInt(number, 10);
      }
    })
  })
}