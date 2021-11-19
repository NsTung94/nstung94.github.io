export const cartItemTemplate = (product) => {
  return `
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
};
