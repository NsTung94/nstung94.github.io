class ProductServices {
  _currentProducts = [];
  _allProducts = [];
  _productsCount = 0;
  async fetchProducts(){
    try {
      const res = await fetch("src/product.json");
      this._allProducts = await res.json();
      this._productsCount = this._allProducts.length;
      return this._allProducts
      } catch (err) {
      console.log(err);
    }
  }
  
  saveProducts(products) {
    this._currentProducts = [...this._currentProducts, ...products];
  }
  
  getCurrentProducts() {
    return _currentProducts;
  }
  

  // get products according to pageIndex & paseSize
  async getProducts(startIndex = 0, pageSize = 3){
    try {
      const lastIndex = startIndex + pageSize;
      const loadedProducts = await this._allProducts.slice(startIndex, lastIndex);
      return loadedProducts;
    }catch(err) {
      console.log(err)
    }
  } 
}

export default new ProductServices();

