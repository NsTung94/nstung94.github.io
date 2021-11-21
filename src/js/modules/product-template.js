import { productItems, purchaseProduct } from "./Product.js";
// console.log ( Product)
export const displayProduct = (product) => {
  // Product Item Container
  var productItem = document.createElement("div");
  productItem.classList.add("product__item");
  productItem.setAttribute("data-id", product.id);
  // Heart Button
  var heartBtn = document.createElement("div");
  heartBtn.classList.add("product__item-heart", "js-heart-button");

  // List Tag DealType
  var tag = document.createElement("div");
  tag.classList.add("item", "product__item-tag");
  var tagString = [];
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
      tagString.push(
        '<div class="tag tag--gift"><img src="./src/images/icon/gift.png"/>free gift</div>'
      );
    }
  }
  tag.innerHTML = tagString.join("");

  // Product Image
  var image = document.createElement("div");
  image.classList.add("product__item-img");
  var itemImage = document.createElement("img");
  itemImage.setAttribute("src", product.picture);
  image.appendChild(itemImage);

  // Product Detail
  var detail = document.createElement("div");
  detail.classList.add("item", "product__item-detail");
  var code = document.createElement("div");
  code.classList.add("product__item-code");
  code.innerHTML = `${product.code}`;
  var name = document.createElement("div");
  name.classList.add("product__item-name");
  name.innerHTML = `${product.name}`;
  var review = document.createElement("div");
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
  var price = document.createElement("div");
  price.classList.add("item", "product__item-price");
  var priceNumber = [];
  if (product.price.old == undefined) {
    var oldPrice = document.createElement("div");
    oldPrice.style.display = "none";
  } else {
    var oldPrice = document.createElement("div");
    oldPrice.classList.add("product__item-price--old");
    oldPrice.innerHTML = `${product.price.old.toLocaleString("de")}`;
  }
  var newPrice = document.createElement("div");
  newPrice.classList.add("product__item-price--new");
  newPrice.innerHTML = `${product.price.new.toLocaleString("de")}`;
  priceNumber.push(oldPrice, newPrice);

  price.appendChild(oldPrice);
  price.appendChild(newPrice);

  // Product Suggestion
  var suggestion = document.createElement("div");
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
  var description = document.createElement("ul");
  description.classList.add("item", "product__item-description");
  const listDescription = product.description
    .map((item) => `<li>${item.value}</li>`)
    .join("");
  description.innerHTML += listDescription;

  // Product Action
  var action = document.createElement("div");
  action.classList.add("item", "product__item-action");
  action.innerHTML = `
    <div class="btn btn--primary product__item-action--add js-add-cart">
        add to cart
    </div>
    <div class="btn product__item-action--research">
        learn more
    </div>
    `;
  // product.purchaseProduct();

  var compare = document.createElement("div");
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
  purchaseProduct();
  return productItem;
};


