export default function addCart(){
    let addBtn = document.querySelectorAll('.js-add-cart');
    let number = document.querySelector('.js-number-cart');
    var value = parseInt(number.value, 10);
    addBtn.forEach(function(item){
        item.addEventListener('click',function(){
            value = isNaN(value) ? 0 : value;
            value++;
            number.value = value;
            number.innerHTML = parseInt(value, 10);
        })
        
    })
}
