import { wish } from "./wish.js";
import addCart from './addCart.js';
import lazyImage from "./lazyImage.js";

export default function displayProduct(product) {
  var productItem = document
    .createElement("div");
  productItem.classList.add("product__item");

  var heartBtn = document.createElement("div");
  heartBtn.classList.add("product__item-heart", "js-heart-button");

  var tag = document.createElement("div");
  tag.classList.add("item", "product__item-tag");

  var image = document.createElement("div");
  image.classList.add("item", "product__item-img", "placeholder");

  var image = document.createElement('div');
  image.classList.add('item', 'product__item-img', "placeholder")
  document.addEventListener("DOMContentLoaded",lazyImage());

  var detail = document.createElement("div");
  detail.classList.add("item", "product__item-detail");

  var price = document.createElement("div");
  price.classList.add("item", "product__item-price");

  var suggestion = document.createElement('div');
  suggestion.classList.add('item', 'product__item-suggestion', 'hide-on-desktop');

  var description = document.createElement('ul');
  description.classList.add('item', 'product__item-description');

  var action = document.createElement('div');
  action.classList.add('item', 'production__item-action');

  // create heart button
  heartBtn.innerHTML = `
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
  wish();
  // create tag dealType
  var tagString = []
  for (var i = 0; i < product.dealType.length; i++) {
    if (product.dealType[i].type == "new") {
      tagString.push('<div class="tag tag--new">new</div>');
    }
    if (product.dealType[i].type == "discount") {
      tagString.push('<div class="tag tag--discount">sale</div>');
    }
    if (product.dealType[i].type == "bundle") {
      tagString.push('<div class="tag tag--bundle">bundle</div>');
    }
    if (product.dealType[i].type == "gift") {
      tagString.push('<div class="tag tag--gift">free gift</div>');
    }
  }

  tag.innerHTML = tagString.join('');
  // item image
  var itemImage = document.createElement('img');
  itemImage.classList.add('lazy-observer');
  itemImage.setAttribute('data-src', product.picture);
  image.appendChild(itemImage);
  // item detail
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
  var priceNumber = []
  if (product.price.old !== "undefined") {
    priceNumber.push(
      '<div class="product__item-price--old">' + product.price.old + "</div>"
    );
  }
  priceNumber.push(
    '<div class="product__item-price--new">' + product.price.new + "</div>"
  );

  //item suggestion
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

  const listDescription = product.description.map(item =>
    `<li>${item.value}</li>`);
  description.innerHTML += listDescription;
  //item action
  action.innerHTML = `
        <button class="btn btn--primary product__item-action--add js-add-cart">
            add to cart
        </button>
        <button class="btn product__item-action--research">
            learn more
        </button>
  `
  addCart()
  productItem.appendChild(heartBtn);
  productItem.appendChild(tag);
  productItem.appendChild(image);
  productItem.appendChild(detail);
  productItem.appendChild(price);
  productItem.appendChild(suggestion);
  productItem.appendChild(description);
  productItem.appendChild(action);

  return productItem;
}

