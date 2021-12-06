class ProductItemBuilder {
  buildFromDataModel(product) {
    const productItem = document.createElement("div");
    productItem.classList.add("product__item");
    productItem.setAttribute("data-id", product.id);
    productItem.innerHTML =
      `
      <div class="product__item-heart js-heart-button">
      </div>
      <div class="product__item-tag">
      ${product.dealType
        .map((deal) => {
          if (deal.type === "new") {
            return '<div class="tag tag--new">new</div>';
          }
          if (deal.type === "discount") {
            return '<div class="tag-wrapper"><div class="tag tag--discount">sale</div></div>';
          }
          if (deal.type === "gift") {
            return '<div class="tag tag--gift"><img src="./src/images/icon/gift.png"/>free gift</div>';
          }
          if (deal.type === "bundle") {
            return '<div class="tag-wrapper"><div class="tag tag--bundle">bundle</div></div>';
          }
        })
        .join("")}
      </div>
      <div class="product__item-img">
        <img class="product__item-img-imgSrc" src="${product.picture}"/>
      </div>
    
      <div class= "item product__item-detail">
        <div class="product__item-code">${product.code}</div>
        <div class="product__item-name">${product.name}</div>
        <div class="product__item-rate">
          <div class="product__item-rate--star">
            <img src="./src/images/icon/star.png" alt="" />
          </div>
          <div class="product__item-rate--number">
            ${product.review} Reviews
          </div>  
        </div>
      </div>

      <div class="item product__item-price">
        ${
          product.price.old == undefined
            ? '<div style="display: none"></div>'
            : `<div class="product__item-price--old">${product.price.old.toLocaleString(
                "de"
              )}</div>`
        }
        <div class="product__item-price--new">
          ${product.price.new.toLocaleString("de")}
        </div>
      </div>

      <div class="item product__item-suggestion hide-on-desktop">
        <div class="product__item-interest">
            <div class="product__item-interest--number">${
              product.interest
            } %</div>
        </div>
        <div class="product__item-payment">
            <div class="product__item-payment--money">
                ${product.payment.toLocaleString("de")} VND/month
            </div>
            <div class="product__item-payment--due">for 6 months</div>
        </div>
      </div>
    ` +
      `<ul class="product__item-description">
          ${product.description
            .map((item) => {
              return `<li>${item.value}</li>`;
            })
            .join("")}
    </ul>

    <div class="item product__item-action">
    ${
      product.quantity > 0 || product.isOutOfStock === true
        ? `<button class="btn btn--primary product__item-action--add js-add-cart" data-id="${product.id}">
      add to cart
      </button>`
        : `<button class="btn product__item-action--out danger disable">out of stock </button>`
    }
    
      <button class="btn product__item-action--research" data-id="${
        product.id
      }">
        learn more
      </button>
    </div>
    <div class="product__item-compare hide-on-mobile">
      <label class="checkBox js-compare-checkbox">
      <input type="checkbox" class="checkbox__input" />
      <span class="checkbox__checkmark checkmark--compare"></span>
      <span class="checkbox__label product__item-compare-label">
        Add to Compare</span
      >
      </label>
    </div>
    `;
    return productItem;
  }
}

export default new ProductItemBuilder();
