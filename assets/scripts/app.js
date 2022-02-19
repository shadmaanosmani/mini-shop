class Product {
  constructor(title, imageUrl, price, description) {
    this.title = title;
    this.imageUrl = imageUrl;
    this.price = price;
    this.description = description;
  }
}

const productList = {
  products: [
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
  ],
  render() {
    const renderHook = document.getElementById("app");
    const productHtmlList = document.createElement("ul");
    productHtmlList.className = "product-list";
    for (const product of this.products) {
      const productHtmlElement = document.createElement("li");
      productHtmlElement.className = "product-item";
      productHtmlElement.innerHTML = `
        <div>
          <img src="${product.imageUrl}" alt="${product.title}" >
          <div class="product-item__content">
            <h2>${product.title}</h2>
            <h3>\$${product.price}</h3>
            <p>${product.description}</p>
            <button>Add to Cart</button>
          </div>
        </div>
      `;
      productHtmlList.append(productHtmlElement);
    }
    renderHook.append(productHtmlList);
  },
};

productList.render();
