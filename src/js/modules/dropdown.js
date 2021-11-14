

// dropdown menu
export function dropdown(button){

    // let dropdown = document.querySelectorAll('.js-dropdown-menu');
    let dropdown = document.querySelectorAll(button);
    dropdown.forEach(function(item){
      let button = item.querySelector('.js-dropdown-button')
      let content = item.querySelector('.js-dropdown-content');
      button.addEventListener('click', function(){
        if (item.classList.contains('show')){
          item.classList.remove('show');
          content.style.height = "0px";      
        }
        else {
          item.classList.add('show');
          let number = content.querySelectorAll('.js-selector-checkbox').length;
          console.log("number is ", number);
          let displayHeight = number * 32;
          content.style.height = displayHeight + "px";
        }
      })
    })
}

export function language(){
  let language = document.querySelector('.js-language');
  let languageDropdown = document.querySelector('.js-language-dropdown');
  language.addEventListener('click', function(){
    if (languageDropdown.style.display == "none"){
      languageDropdown.style.display = 'flex';
    }
    else {
      languageDropdown.style.display = "none";
    }
  })
  
  let sliderItems = document.querySelectorAll('.js-slider-item');
  
  sliderItems.forEach(function(item){
    item.addEventListener('click', function(){
      sliderItems.forEach(item => item.classList.remove("selected"));
      item.classList.add('selected');
    })
  })
}
