class Product {
  constructor(title, imageUrl, price, description) {
    this.title = title;
    this.imageUrl = imageUrl;
    this.price = price;
    this.description = description;
  }
}

class ProductItem {
  constructor(product) {
    this.product = product;
  }

  render() {
    const productHtmlElement = document.createElement("li");
    productHtmlElement.className = "product-item";
    productHtmlElement.innerHTML = `
    <div>
      <img src="${this.product.imageUrl}" alt="${this.product.title}" >
      <div class="product-item__content">
        <h2>${this.product.title}</h2>
        <h3>\$${this.product.price}</h3>
        <p>${this.product.description}</p>
        <button>Add to Cart</button>
      </div>
    </div>
  `;
    const addToCartButton = productHtmlElement.querySelector("button");
    addToCartButton.addEventListener("click", this.addToCart.bind(this));
    return productHtmlElement;
  }

  addToCart() {
    App.addProductToCart(this.product);
  }
}

class ShoppingCart {
  productList = [];

  addProduct(product) {
    const updatedProductList = [...this.productList];
    updatedProductList.push(product);
    this.cartItems = updatedProductList;
  }

  set cartItems(productList) {
    this.productList = productList;
    this.totalHtmlElement.innerHTML = `
    <h2>Total: \$${this.total.toFixed(2)}<h2 />
  `;
  }

  get total() {
    return this.productList.reduce(
      (previousValue, currentItem) => previousValue + currentItem.price,
      0
    );
  }

  render() {
    const cartHtmlElement = document.createElement("section");
    cartHtmlElement.innerHTML = `
    <h2>Total: \$${0}<h2 />
    <button>Order now!</button>
  `;
    this.totalHtmlElement = cartHtmlElement.querySelector("h2");
    cartHtmlElement.className = "cart";
    return cartHtmlElement;
  }
}

class Shop {
  render() {
    const renderHook = document.getElementById("app");
    this.shoppingCart = new ShoppingCart();
    const shoppingCartHtmlElement = this.shoppingCart.render();
    const productList = new ProductList();
    const productListHtmlElement = productList.render();
    renderHook.append(shoppingCartHtmlElement);
    renderHook.append(productListHtmlElement);
  }
}
class ProductList {
  products = [
    new Product(
      "A Pillow",
      "https://www.maxpixel.net/static/photo/2x/Soft-Pillow-Green-Decoration-Deco-Snuggle-1241878.jpg",
      19.99,
      "A soft pillow!"
    ),
    new Product(
      "A Carpet",
      "https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Ardabil_Carpet.jpg/397px-Ardabil_Carpet.jpg",
      89.99,
      "A carpet which you might like - or not."
    ),
  ];

  render() {
    const productHtmlList = document.createElement("ul");
    productHtmlList.className = "product-list";
    for (const product of this.products) {
      const productItem = new ProductItem(product);
      const productItemHtmlElement = productItem.render();
      productHtmlList.append(productItemHtmlElement);
    }
    return productHtmlList;
  }
}

class App {
  static shoppingCart;

  static init() {
    const shop = new Shop();
    shop.render();
    this.shoppingCart = shop.shoppingCart;
  }

  static addProductToCart(product) {
    this.shoppingCart.addProduct(product);
  }
}

App.init();
