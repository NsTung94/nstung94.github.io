// click heart to add wishlist
let wishCount = document.querySelector('.js-number-wish')

export function wish(){

    let hearts = document.querySelectorAll(".js-heart-button");
    hearts.forEach(function(item){
      let unwish = item.querySelector('.outline'
      )
      let wish = item.querySelector('.fill');
      item.addEventListener('click', function(){
        console.log('wish', wish, 'style', wish.style)
          if (wish.style.display == 'none'){
            wish.style.display = "block";
            unwish.style.display = "none";
          }else{
            wish.style.display = "none";
            unwish.style.display = "block";
          }
      })
    })
}