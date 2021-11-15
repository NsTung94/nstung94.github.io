import { wish } from "./modules/wish.js";

export default function displayProduct(product) {
  var productItem = document
    .createElement("div")
    .classList.add(".product__item");

  // create heart button
  var wish = document
    .createElement("div")
    .classList.add("product__item-heart", "js-heart-button");
  wish();
  wish.innerHTML = `
    <img class="outline"
        src="./src/images/icon/heart-outline-icon.svg"
        alt=""
    />
    <img
        src="./src/images/icon/heart-filled-icon.svg"
        alt=""
        class="fill hide"
    />
    `;
  //create tag dealType
  var tag = document
    .createElement("div")
    .classList.add("item", "product__item-tag");
  for (var i = 0; i < product.dealType.length; i++) {
    if (dealType[i].type == "new") {
      document.body.appendChild('<div class="tag tag--new">new</div>');
      if (dealType[i].type == "discount") {
        document.body.appendChild('<div class="tag tag--discount">sale</div>');
      }
      if (dealType[i].type == "bundle") {
        document.body.appendChild('<div class="tag tag--bundle">bundle</div>');
      }
      if (dealType[i].type == "gift") {
        document.body.appendChild('<div class="tag tag--gift">free gift</div>');
      }
    }
  }
  // item image
  var image = document
    .createElement("div")
    .classList.add("item", "product__item-img", "placeholder");
  image.innerHTML = `
            <img
                class="product__item-img--content lazy-observer"
                data-src="${product.picture}"
                alt=""
            />
                `;
  // item detail
  var detail = document
    .createElement("div")
    .classList.add("item", "product__item-detail");
  detail.innerHTML = `      
        <div class="product__item-code">${product.code}</div>
        <div class="product__item-name">
            ${product.name}
        </div>
        <div class="product__item-rate">
            <div class="product__item-rate--star">
                <img src="./src/images/icon/star.png" alt="" />
            </div>
            <div class="product__item-rate--number">
                ${product.review} Reviews
            </div>
        </div>
    `;
  //item price
  var price = document
    .createElement("div")
    .classList.add("item", "product__item-price");
  if (product.price.old !== "undefined") {
    document.body.appendChild(
      '<div class="product__item-price--old">' + product.price.old + "</div>"
    );
  }
  document.body.appendChild(
    '<div class="product__item-price--new">' + product.price.new + "</div>"
  );
  //item suggestion
  var suggestion = document.createElement('div').classList.add('item', 'product__item-suggestion', 'hide-on-desktop');
  suggestion.innerHTML = `
        <div class="product__item-interest">
            <div class="product__item-interest--number">${product.interest} %</div>
        </div>
        <div class="product__item-payment">
            <div class="product__item-payment--money">
                ${product.payment} VND/month
            </div>
            <div class="product__item-payment--due">for 6 months</div>
        </div>
  `
  //item description 
  var description = document.createElement('ul').classList.add('item', 'product__item-description');
  product.description.map(item => `<li>${item.value}</li>`);

  //item action
  var action = document.createElement('div').classList.add('item','production__item-action');
  action.innerHTML = `
        <button class="btn btn--primary product__item-action--add">
            add to cart
        </button>
        <button class="btn product__item-action--research">
            learn more
        </button>
  `

  listItem.innerHTML+= wish.outerHTML + 
  productItem.appendChild(listItem);
 
  // listItem.innerHTML+= listItemCheckbox.outerHTML + listItemLabel.outerHTML + editButton.outerHTML + deleteButton.outerHTML;
  // listElement.appendChild(listItem);
}

// for (var i = 0; i < 5; i++) {
//   document.body.appendChild('<div class="new-dom">New DOM</div>');
//   init();
// }

// function init() {
//   // do something
//   document
//     .getElementsByClassName(".js-heart-button")
//     .addEventListener("click", function () {
//       // do something
//     });
// }
