import getProductData from './modules/product.js';
import getCartData from './modules/cart.js';

const sections = document.querySelectorAll(".section");
const browseSection = document.getElementById("browse");


window.onload = function() {
  history.replaceState(null, null, ' ');
}

function loadProducts(product) {
  product.forEach((productData) => {
    const card = document.createElement('div');
    card.classList.add('product-card-browse');

    const img = document.createElement('img');
    img.src = productData.image;
    img.alt = productData.name;

    const name = document.createElement('h5');
    name.textContent = productData.name;

    const description = document.createElement('p');
    description.textContent = productData.description;

    const price = document.createElement('p');
    price.classList.add('price');
    price.textContent = `₹${productData.price.toLocaleString('en-IN')}`;

    const controls = document.createElement('div');
    controls.classList.add('cart-controls');

    const minus = document.createElement('button');
    minus.textContent = '-';

    const quantity = document.createElement('span');
    quantity.textContent = '0';

    const plus = document.createElement('button');
    plus.textContent = '+';

    controls.append(minus, quantity, plus);
    card.append(img, name, description, price, controls);
    
    browseSection.appendChild(card);
  });
}

function loadCart() {

}


window.addEventListener("hashchange", () => {
  const target = (location.hash || "#home").substring(1);

  sections.forEach(function(node) {
    node.style.display = "none";
  });

  const page = document.getElementById(target);
  page.style.display = "block";
});

getProductData().then((data) => {
  loadProducts(data);
});
