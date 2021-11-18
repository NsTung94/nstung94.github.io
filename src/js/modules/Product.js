class Product {
  loadProducts = async () => {
    try {
      const res = await fetch("src/product.json");
      let products = await res.json();
      var sliced = products.slice(start, end);
      // displayProducts(sliced);
      // filteringProduct(products);
    } catch (err) {
      console.log(err);
    }
  };
  displayProduct(product) {
    var productItem = document.createElement("div");
    productItem.classList.add("product__item");

    var heartBtn = document.createElement("div");
    heartBtn.classList.add("product__item-heart", "js-heart-button");

    var tag = document.createElement("div");
    tag.classList.add("item", "product__item-tag");

    var image = document.createElement("div");
    image.classList.add("product__item-img");
    // document.addEventListener("DOMContentLoaded",lazyImage());

    var detail = document.createElement("div");
    detail.classList.add("item", "product__item-detail");

    var price = document.createElement("div");
    price.classList.add("item", "product__item-price");

    var suggestion = document.createElement("div");
    suggestion.classList.add(
      "item",
      "product__item-suggestion",
      "hide-on-desktop"
    );

    var description = document.createElement("ul");
    description.classList.add("item", "product__item-description");

    var action = document.createElement("div");
    action.classList.add("item", "product__item-action");
    wish();
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

    // create tag dealType
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
    // item image
    var itemImage = document.createElement("img");
    // itemImage.classList.add('lazy-observer');
    itemImage.setAttribute("src", product.picture);
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
    var priceNumber = [];
    if (product.price.old == undefined) {
      console.log("trigger");
      '<div class="product__item-price--old" style="display:none;">' +
        product.price.old +
        "</div>";
    } else {
      priceNumber.push(
        '<div class="price-number product__item-price--old">' +
          product.price.old.toLocaleString("de") +
          "</div>"
      );
    }
    priceNumber.push(
      '<div class=" price-number product__item-price--new">' +
        product.price.new.toLocaleString("de") +
        "</div>"
    );
    const htmlString = priceNumber.join("");
    price.innerHTML = htmlString;
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
        `;
    //item description

    const listDescription = product.description
      .map((item) => `<li>${item.value}</li>`)
      .join("");
    description.innerHTML += listDescription;
    //item action
    action.innerHTML = `
              <button class="btn btn--primary product__item-action--add js-add-cart">
                  add to cart
              </button>
              <button class="btn product__item-action--research">
                  learn more
              </button>
        `;
    productItem.appendChild(heartBtn);
    productItem.appendChild(tag);
    productItem.appendChild(image);
    productItem.appendChild(detail);
    productItem.appendChild(price);
    productItem.appendChild(suggestion);
    productItem.appendChild(description);
    productItem.appendChild(action);
    productItem.appendChild(compare);

    return productItem;
  }
} 

const product = new Product();

product.loadProducts();
product.displayProduct();
