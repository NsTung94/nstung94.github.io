// click heart to add wishlist
let wishCount = document.querySelector('.js-number-wish');
var number = parseInt(wishCount.number, 10);

export function wish(){

    let hearts = document.querySelectorAll(".js-heart-button");
    hearts.forEach(function(item){
      let wish = item.querySelector('.outline')
      let unwish = item.querySelector('.fill');
      item.addEventListener('click', function(){
        console.log(number);
          if (wish.style.display == 'none'){
            wish.style.display = "block";
            unwish.style.display = "none";
            // number = isNaN(number) ? 0 : number;
            // number ++;
            // wishCount.innerHTML = parseInt(number, 10);
            
          }else{
            wish.style.display = "none";
            unwish.style.display = "block";
            // number = isNaN(number) ? 0 : number;
            // number --;
            // wishCount.innerHTML = parseInt(number, 10);
          }
        }
        
      )
    })
}