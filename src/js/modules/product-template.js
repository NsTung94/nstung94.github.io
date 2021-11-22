import { purchaseProduct } from "./Product.js";
// console.log ( Product)
export const productItemTemplate = (product) => {
  // Product Item Container
  let productItem = document.createElement("div");
  productItem.classList.add("product__item");
  productItem.setAttribute("data-id", product.id);
  // Heart Button
  let heartBtn = document.createElement("div");
  heartBtn.classList.add("product__item-heart", "js-heart-button");

  // List Tag DealType
  let tag = document.createElement("div");
  tag.classList.add("item", "product__item-tag");
  let tagString = [];
  for (let i = 0; i < product.dealType.length; i++) {
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
      tagString.push(
        '<div class="tag tag--gift"><img src="./src/images/icon/gift.png"/>free gift</div>'
      );
    }
  }
  tag.innerHTML = tagString.join("");

  // Product Image
  let image = document.createElement("div");
  image.classList.add("product__item-img");
  let itemImage = document.createElement("img");
  itemImage.setAttribute("src", product.picture);
  image.appendChild(itemImage);

  // Product Detail
  let detail = document.createElement("div");
  detail.classList.add("item", "product__item-detail");
  let code = document.createElement("div");
  code.classList.add("product__item-code");
  code.innerHTML = `${product.code}`;
  let name = document.createElement("div");
  name.classList.add("product__item-name");
  name.innerHTML = `${product.name}`;
  let review = document.createElement("div");
  review.classList.add("product__item-rate");
  review.innerHTML = `
        <div class="product__item-rate--star">
            <img src="./src/images/icon/star.png" alt="" />
        </div>
        <div class="product__item-rate--number">
            ${product.review} Reviews
        </div>
        `;

  detail.appendChild(code);
  detail.appendChild(name);
  detail.appendChild(review);

  // Product Price
  let price = document.createElement("div");
  price.classList.add("item", "product__item-price");
  let oldPrice = document.createElement("div");
  if (product.price.old == undefined) {
    oldPrice.style.display = "none";
  } else {
    oldPrice.classList.add("product__item-price--old");
    oldPrice.innerHTML = `${product.price.old.toLocaleString("de")}`;
  }
  let newPrice = document.createElement("div");
  newPrice.classList.add("product__item-price--new");
  newPrice.innerHTML = `${product.price.new.toLocaleString("de")}`;

  price.appendChild(oldPrice);
  price.appendChild(newPrice);

  // Product Suggestion
  let suggestion = document.createElement("div");
  suggestion.classList.add(
    "item",
    "product__item-suggestion",
    "hide-on-desktop"
  );
  suggestion.innerHTML = `
          <div class="product__item-interest">
              <div class="product__item-interest--number">${product.interest} %</div>
          </div>
          <div class="product__item-payment">
              <div class="product__item-payment--money">
                  ${product.payment.toLocaleString("de")} VND/month
              </div>
              <div class="product__item-payment--due">for 6 months</div>
          </div>
        `;

  // Product Description
  let description = document.createElement("ul");
  description.classList.add("item", "product__item-description");
  const listDescription = product.description
    .map((item) => `<li>${item.value}</li>`)
    .join("");
  description.innerHTML += listDescription;

  // Product Action
  let action = document.createElement("div");
  action.classList.add("item", "product__item-action");
  let add = document.createElement("div");
  add.classList.add('btn', 'btn--primary', 'product__item-action--add', 'js-add-cart');
  add.setAttribute('data-id', product.id);
    add.innerHTML = `add to cart`
  let research = document.createElement('div');
  research.classList.add('btn','product__item-action--research')
  research.innerHTML = `learn more`
  action.appendChild(add);
  action.appendChild(research);
  // product.purchaseProduct();

  let compare = document.createElement("div");
  compare.classList.add("product__item-compare", "hide-on-mobile");
  compare.innerHTML = `
            <label class="checkBox js-compare-checkbox">
              <input type="checkbox" class="" />
              <span class="checkmark checkmark--compare"></span>
              <span class="checkbox__label product__item-compare-label">
                Add to Compare</span
              >
            </label>
        `;

  // Append to Product Item Container for display
  productItem.appendChild(heartBtn);
  productItem.appendChild(tag);
  productItem.appendChild(image);
  productItem.appendChild(detail);
  productItem.appendChild(price);
  productItem.appendChild(suggestion);
  productItem.appendChild(description);
  productItem.appendChild(action);
  productItem.appendChild(compare);
  
  // console.log("productItem", productItem);
  // document.addEventListener('DOMContentLoaded', function(){
  //   console.log('DOM fully loaded and parsed');
  //   purchaseProduct()
  // });
  setTimeout(function(){
    purchaseProduct()
  }, 100)
    
  return productItem;
};


