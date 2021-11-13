// click heart to add wishlist
export function wish(button){
    // let hearts = document.querySelectorAll('.js-heart-button');
    let hearts = document.querySelectorAll(button);
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