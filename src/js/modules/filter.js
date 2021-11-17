// function filteringProduct(products) {
//   // console.log('all products', products);
//   products.map((product, index) => {
//     // console.log(index, ": dealtype", product.dealType)
//     // console.log(index, ": price", product.price.new)
//     const typeContain = product.dealType.map(deal => deal.type);
//     const filterPromoConditions = [];
//     const filterPriceConditions = [];
//     // click apply
//     const applyFilter = document.querySelector(".js-apply-filter");
//     // get all checkbox include in conditions
//     applyFilter.addEventListener("click", function () {
//       const promos = document.querySelectorAll(
//         ".js-filter-promo-checkbox input[type=checkbox]:checked"
//       );
//       promos.forEach((promo) => filterPromoConditions.push(promo.value));
//       // console.log("promo filter", filterPromoConditions);

//       filterPromo(typeContain, filterPromoConditions)
//       const prices = document.querySelectorAll(
//         ".js-filter-price-checkbox input[type=checkbox]:checked"
//       );
//       prices.forEach((price) => filterPriceConditions.push(price.value));
//       // console.log("price filter", filterPriceConditions);
//       filterPrice(product.price.new, filterPriceConditions);
//     });
//   })
// }

// const dealType = [{ type: "new" }, { type: "discount" }, { type: "bundle" }];
// var allTypes = dealType.map((type) => type.type);

// const conditions = ["new", "discount"];

// console.log(
//   "check",
//   conditions.every((condition) => allTypes.includes(condition))
// );

/* Keep track filterConditions
   if( FilterConditions is empty) => loadProduct()
   else filterProduct with FilterConditions
   display product filtered
*/

// function filterPromo(item, conditions) {
//   // console.log('filter item: ', item)
//   if (conditions.every(condition => item.includes(condition))) {
//     return item;
//   };
// }

// function filterPrice(item, conditions){
//   console.log('price item', item);
// }