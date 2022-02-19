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
    return productHtmlElement;
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
    const renderHook = document.getElementById("app");
    const productHtmlList = document.createElement("ul");
    productHtmlList.className = "product-list";
    for (const product of this.products) {
      const productItem = new ProductItem(product);
      const productItemHtmlElement = productItem.render();
      productHtmlList.append(productItemHtmlElement);
    }
    renderHook.append(productHtmlList);
  }
}

const productList = new ProductList();

productList.render();
