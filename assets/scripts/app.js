class Component {
  constructor(renderHookId) {
    this.renderHookId = renderHookId;
  }

  createRootHtmlElement(tag, cssClassList, attributeList) {
    const rootHtmlElement = document.createElement(tag);
    if (cssClassList) {
      rootHtmlElement.className = cssClassList;
    }
    if (attributeList && attributeList.length > 0) {
      for (const attribute of attributeList) {
        rootHtmlElement.setAttribute(attribute.key, attribute.value);
      }
    }
    document.getElementById(this.renderHookId).append(rootHtmlElement);
    return rootHtmlElement;
  }
}
class Product {
  constructor(title, imageUrl, price, description) {
    this.title = title;
    this.imageUrl = imageUrl;
    this.price = price;
    this.description = description;
  }
}

class ProductItem extends Component {
  constructor(product, renderHookId) {
    super(renderHookId);
    this.product = product;
  }

  render() {
    const productHtmlElement = this.createRootHtmlElement("li", "product-item");
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
  }

  addToCart() {
    App.addProductToCart(this.product);
  }
}

class ElementAttribute {
  constructor(key, value) {
    this.key = key;
    this.value = value;
  }
}

class ShoppingCart extends Component {
  productList = [];

  constructor(renderHookId) {
    super(renderHookId);
  }

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
    const cartHtmlElement = this.createRootHtmlElement("section", "cart");
    cartHtmlElement.innerHTML = `
    <h2>Total: \$${0}<h2 />
    <button>Order now!</button>
  `;
    this.totalHtmlElement = cartHtmlElement.querySelector("h2");
  }
}

class Shop {
  render() {
    this.shoppingCart = new ShoppingCart("app");
    this.shoppingCart.render();
    const productList = new ProductList("app");
   productList.render();
  }
}
class ProductList extends Component {
  constructor(renderHookId) {
    super(renderHookId);
  }

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
    this.createRootHtmlElement("ul", "product-list", [
      new ElementAttribute("id", "prod-list"),
    ]);
    for (const product of this.products) {
      const productItem = new ProductItem(product, "prod-list");
      productItem.render();
    }
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
