const cartTemplate = (product) => {
    const cartItem = document.createElement("div");
    cartItem.classList.add("cart__item");
    cartItem.innerHTML = `
      <div class="cart__item-img">
      <img src="${product.imgSrc}" alt="" />
    </div>
    <div class="cart__container-detail">
      <div class="cart__item-name">
        ${product.name}
      </div>
      <div class="cart__item-code">${product.code}</div>
      <div class="cart__item-quantity disable">
      <div class="cartpage__product-quantity">
      <div
        class="btn cartpage-box cartpage__product-quantity--decrease"
      ></div>
      <div
        class="btn cartpage-box cartpage__product-quantity--number"
      >
        1
      </div>
      <div
        class="btn cartpage-box cartpage__product-quantity--increase"
      ></div>
    </div>
        
        
      </div>
    </div>
    <div class="cart__container-decision">
      <div class="cart__item-price">
        ${product.price}
      </div>
      <div class="cart__item-price price-old">
          ${product.oldPrice}
      </div>
      <div class="cart__item-delete--big">
        <img
          src="./src/images/icon/delete-icon.svg"
          alt=""
        />
      </div>
      <div class="cart__item-delete--small">
        <img
          src="./src/images/icon/delete-icon.svg"
          alt=""
        />
      </div>
    </div>
      `;
}

 
