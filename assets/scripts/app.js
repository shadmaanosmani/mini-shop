class Component {
  constructor(renderHookId, shouldRender = true) {
    this.renderHookId = renderHookId;
    if (shouldRender) {
      this.render();
    }
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
    super(renderHookId, false);
    this.product = product;
    this.render();
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

  placeOrder() {
    console.log("Ordering...");
    console.log(this.productList);
  }

  render() {
    const cartHtmlElement = this.createRootHtmlElement("section", "cart");
    cartHtmlElement.innerHTML = `
    <h2>Total: \$${0}<h2 />
    <button>Order now!</button>
  `;
    const orderNowButton = cartHtmlElement.querySelector("button");
    orderNowButton.addEventListener("click", () => this.placeOrder());
    this.totalHtmlElement = cartHtmlElement.querySelector("h2");
  }
}

class Shop extends Component {
  constructor() {
    super();
  }
  render() {
    this.shoppingCart = new ShoppingCart("app");
    new ProductList("app");
  }
}
class ProductList extends Component {
  productList = [];

  constructor(renderHookId) {
    super(renderHookId);
    this.fetchProducts();
  }

  fetchProducts() {
    this.productList = [
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
    this.renderProducts();
  }

  renderProducts() {
    for (const product of this.productList) {
      new ProductItem(product, "prod-list");
    }
  }

  render() {
    this.createRootHtmlElement("ul", "product-list", [
      new ElementAttribute("id", "prod-list"),
    ]);
    if (this.productList && this.productList.length > 0) {
      this.renderProducts();
    }
  }
}

class App {
  static shoppingCart;

  static init() {
    const shop = new Shop();
    this.shoppingCart = shop.shoppingCart;
  }

  static addProductToCart(product) {
    this.shoppingCart.addProduct(product);
  }
}

App.init();
