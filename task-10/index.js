import getProductData from './modules/product.js';

const sections = document.querySelectorAll(".section");
const browseSection = document.getElementById("browse");
const productFilter = document.getElementById("product-filter");
const productSearch = document.getElementById("product-search");

let products = [];
cart = JSON.parse(localStorage.getItem("cartInfo")) || [];

getProductData().then((data) => {
  products = data;
  loadProducts(data);
});

window.onload = function() {
  history.replaceState(null, null, ' ');
  document.getElementById("product-filter").value = 'All';
  document.getElementById("product-search").value = '';
}

function loadProducts(products) {
  const productsContainer = document.getElementById('product-container');
  productsContainer.innerHTML = '';

  products.forEach((productData) => {
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

    // addToCart
    plus.addEventListener("click", function() {
      if(cart.find(item => item.id === productData.id)) {
        cart.find(item => item.id === productData.id).quantity += 1;
      } else {
        cart.push({id: productData.id, quantity: 1})
      }
      
      try {
        localStorage.setItem("cartInfo", JSON.stringify(cart));
      } catch {
        alert("Something went wrong. try again.");
      }

      quantity.textContent = (Number(quantity.textContent) + 1).toString();
    });

    //removeFromCart 
    minus.addEventListener("click", function(event) {
      if(cart.find(item => item.id === productData.id)) {
        cart.find(item => item.id === productData.id).quantity -= 1;
        if (!cart.find(item => item.id === productData.id).quantity) {
          cart = cart.filter(item => item.id !== productData.id);
        }
      } 

      if (Number(quantity.textContent)) {
        quantity.textContent = (Number(quantity.textContent) - 1).toString();
      }

      try {
        localStorage.setItem("cartInfo", JSON.stringify(cart));
      } catch {
        alert("Something went wrong. try again.");
      }
    });

    // get cart info from local storage and update the DOM 
    const cartInfo = JSON.parse(localStorage.getItem("cartInfo"));
    if (cart.find(item => item.id === productData.id)) {
      quantity.textContent = cart.find(item => item.id === productData.id).quantity;
    }

    controls.append(minus, quantity, plus);
    card.append(img, name, description, price, controls);
    
    productsContainer.appendChild(card);
  });
}

function loadCart() {

}

productFilter.addEventListener("change", (event) => {
  const val = document.getElementById("product-filter").value;

  if (val == "All") {
    loadProducts(products);
  } else {
    const filteredProduct = products.filter(item => item.category === val);
    loadProducts(filteredProduct);
  }
});

productSearch.addEventListener("keypress", function(event) {
  if (event.key === 'Enter') {
    const filteredProduct = products.filter(item => 
      item.name.toLowerCase().includes(productSearch.value.toLowerCase()) ||
      item.description.toLowerCase().includes(productSearch.value.toLowerCase())
    );

    if (filteredProduct.length != 0) {
      loadProducts(filteredProduct);
    } else {
      const productsContainer = document.getElementById('product-container');
      productsContainer.innerHTML = '';

      const message = document.createElement("h3");
      message.classList.add('err-message');
      message.textContent = `Couldn't Find Product '${productSearch.value}'`;

      productsContainer.appendChild(message);
    }
  }
});


window.addEventListener("hashchange", () => {
  const target = (location.hash || "#home").substring(1);

  sections.forEach(function(node) {
    node.style.display = "none";
  });

  const page = document.getElementById(target);
  page.style.display = "block";
});
