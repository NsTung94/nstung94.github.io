export const cartTemplate = (product) => {
  const cartItem = document.createElement("div");
  cartItem.classList.add("cart__item");

  const cartImage = document.createElement("div");
  cartImage.classList.add("cart__item-img");
  cartImage.innerHTML = `<img class="cart__item-img--imgSrc" src="${product.picture}" alt="" />`;

  const cartDetail = document.createElement("div");
  cartDetail.classList.add("cart__container-detail");

  const cartName = document.createElement("div");
  cartName.classList.add("cart__item-name");
  cartName.innerHTML = `${product.name}`;

  const cartCode = document.createElement("div");
  cartCode.classList.add("cart__item-code");
  cartCode.innerHTML = `${product.code}`;

  const cartQuantityItem = document.createElement("div");
  cartQuantityItem.classList.add("cart__item-quantity");

  const cartQuantity = document.createElement("div");
  cartQuantity.classList.add("cartpage__product-quantity");

  const cartDecrease = document.createElement("div");
  cartDecrease.setAttribute("data-id", product.id);
  cartDecrease.classList.add(
    "btn",
    "cartpage-box",
    "cartpage__product-quantity--decrease",
    "js-cart-decrease"
  );

  const cartQuantityNumber = document.createElement("div");
  cartQuantityNumber.classList.add(
    "btn",
    "cartpage-box",
    "cartpage__product-quantity--number"
  );
  cartQuantityNumber.innerHTML = `${product.cartQuantity}`;

  const cartIncrease = document.createElement("div");
  cartIncrease.setAttribute("data-id", product.id);
  cartIncrease.classList.add(
    "btn",
    "cartpage-box",
    "cartpage__product-quantity--increase",
    "js-cart-increase"
  );

  cartQuantity.appendChild(cartDecrease);
  cartQuantity.appendChild(cartQuantityNumber);
  cartQuantity.appendChild(cartIncrease);
  cartQuantityItem.appendChild(cartQuantity);
  cartDetail.appendChild(cartName);
  cartDetail.appendChild(cartCode);
  cartDetail.appendChild(cartQuantityItem);

  const cartDecision = document.createElement("div");
  cartDecision.classList.add("cart__container-decision");
  const cartPrice = document.createElement("div");
  cartPrice.classList.add("cart__item-price");
  const cartOldPrice = document.createElement("div");
  cartOldPrice.classList.add("cart__item-price", "price-old");
  if (product.quantity !== 0) {
    cartPrice.innerHTML = `
      ${product.price.new.toLocaleString("de")}
    `;
    if (product.price.old !== undefined) {
      cartOldPrice.innerHTML = `
        ${product.price.old.toLocaleString("de")}  
      `;
    } else {
      cartOldPrice.classList.add("hide");
    }
  } else {
    cartPrice.classList.add("danger", "hide-after");
    cartPrice.innerHTML = `
        Out of Stock
    `;
    cartOldPrice.classList.add("hide");
    cartQuantity.classList.add("disable");
    cartQuantityNumber.innerHTML = 0;
  }
  const cartDelete = document.createElement("div");
  cartDelete.classList.add("cart__item-delete--big", "js-cart-delete");
  cartDelete.setAttribute("data-id", product.id);
  cartDelete.innerHTML = `
    <img class="js-cart-delete" data-id=${product.id}
      src="./src/images/icon/delete-icon.svg"
      alt=""
    />
  `;
  cartDecision.appendChild(cartPrice);
  cartDecision.appendChild(cartOldPrice);
  cartDecision.appendChild(cartDelete);
  cartItem.appendChild(cartImage);
  cartItem.appendChild(cartDetail);
  cartItem.appendChild(cartDecision);

  return cartItem;
};

export const Card = {
  init(tag, classNames = []) {
    this.tag = tag;
    this.classNames = classNames;
    this.createCard = function () {
      const div = document.createElement(tag);
      this.classNames.forEach((name) => {
        div.classList.add(name);
      });
      return div;
    };
    return this;
  },
};
const cartItem = Object.create(Card).init("div", ["cart__item"]).createCard();
const cartImage = Object.create(Card)
  .init("div", ["cart__item-img"])
  .createCard();
cartImage.innerHTML = `<img class="cart__item-img--imgSrc" src=" " alt=" " />`;

const cartDetail = Object.create(Card)
  .init("div", ["cart__container-detail", "item"])
  .createCard();
const cartName = Object.create(Card)
  .init("div", ["cart__item-name"])
  .createCard();
const cartCode = Object.create(Card)
  .init("div", ["cart__item-code"])
  .createCard();
const cartQuantityCover = Object.create(Card)
  .init("div", ["cart__item-quantity"])
  .createCard();
const cartQuantity = Object.create(Card)
  .init("div", ["cartpage__product-quantity"])
  .createCard();
const cartQuantityDecrease = Object.create(Card)
  .init("div", [
    "cartpage__product-quantity--decrease",
    "btn",
    "cartpage-box",
    "js-cart-decrease",
  ])
  .createCard();
cartQuantityDecrease.setAttribute("data-id", 1);
const cartQuantityNumber = Object.create(Card)
  .init("div", ["cartpage__product-quantity--number", "btn", "cartpage-box"])
  .createCard();
const cartQuantityIncrease = Object.create(Card)
  .init("div", [
    "cartpage__product-quantity--increase",
    "btn",
    "cartpage-box",
    "js-cart-increase",
  ])
  .createCard();
cartQuantityIncrease.setAttribute("data-id", 1);
cartQuantity.appendChild(cartQuantityDecrease);
cartQuantity.appendChild(cartQuantityNumber);
cartQuantity.appendChild(cartQuantityIncrease);
cartQuantityCover.appendChild(cartQuantity);

const cartDecision = Object.create(Card)
  .init("div", ["cart__container-decision"])
  .createCard();
const cartPrice = Object.create(Card)
  .init("div", ["cart__item-price"])
  .createCard();
const cartOldPrice = Object.create(Card)
  .init("div", ["cart__item-price", "price-old"])
  .createCard();
// if (product.quantity !== 0) {
//   cartPrice.innerHTML = `
//       ${product.price.new.toLocaleString("de")}
//     `;
//   if (product.price.old !== undefined) {
//     cartOldPrice.innerHTML = `
//         ${product.price.old.toLocaleString("de")}
//       `;
//   } else {
//     cartOldPrice.classList.add("hide");
//   }
// } else {
//   cartPrice.classList.add("danger", "hide-after");
//   cartPrice.innerHTML = `
//         Out of Stock
//     `;
//   cartOldPrice.classList.add("hide");
//   cartQuantity.classList.add("disable");
//   cartQuantityNumber.innerHTML = 0;
// }

const cartDelete = Object.create(Card)
  .init("div", ["cart__item-delete--big", "js-cart-delete"])
  .createCard();
cartDelete.innerHTML = `
    <img class="js-cart-delete" data-id=" "
      src="./src/images/icon/delete-icon.svg"
      alt=""
    />
  `;
cartDecision.appendChild(cartPrice);
cartDecision.appendChild(cartOldPrice);
cartDecision.appendChild(cartDelete);

cartItem.appendChild(cartImage);
cartItem.appendChild(cartDetail);
cartItem.appendChild(cartName);
cartItem.appendChild(cartCode);
cartItem.appendChild(cartQuantityCover);
cartItem.appendChild(cartDecision);

console.log(cartItem);
