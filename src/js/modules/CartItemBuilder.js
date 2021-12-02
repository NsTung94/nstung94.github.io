class CartItemBuilder{

  buildFromDataModel(product){
    const div = document.createElement("div");
    div.classList.add("cart__item");
    div.innerHTML = `
      
        <div class="cart__item-img">
          <img class="cart__item-img--imgSrc" src="${product.picture}" alt="" />
        </div>
        <div class="cart__container-detail">
          <div class="cart__item-name">${product.name}</div>
          <div class="cart__item-code">${product.code}</div>
          <div class="cart__item-quantity">
            <div class="cartpage__product-quantity">
              <div class="btn cartpage-box cartpage__product-quantity--decrease js-cart-decrease" data-id=${
                product.id
              }></div>
              <div class="btn cartpage-box cartpage__product-quantity--number">${product.cartQuantity}</div>
              <div class="btn cartpage-box cartpage__product-quantity--increase js-cart-increase ${
                product.quantity === product.cartQuantity ? "disable" : ""
              }" data-id=${product.id}></div>
            </div> 
          </div>
          </div>
          <div class="cart__container-decision">
              ${
                product.quantity !== 0 && product.quantity > product.cartQuantity
                  ? `<div class="cart__item-price">
                  ${product.price.new.toLocaleString("de")}
                </div>`
                  : `<div class='cart__item-price danger hide-after'>Out of Stock</div>`
              }          
              ${
                product.price.old !== undefined
                  ? `<div class="cart__item-price price-old">${product.price.old.toLocaleString(
                      "de"
                    )}</div>`
                  : `<div class="hide"></div>`
              }
            <div class="cart__item-delete--big">
              <img class="js-cart-delete" data-id=${product.id}
                src="./src/images/icon/delete-icon.svg" alt=""
              />  
            </div>
          </div>
        </div>
  `;
    return div;
  }
}

export default new CartItemBuilder;