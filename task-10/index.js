import getProductData from './modules/product.js';

const sections = document.querySelectorAll(".section");
const browseSection = document.getElementById("browse");
const cartSection = document.getElementById("cart");
const productFilter = document.getElementById("product-filter");
const productSearch = document.getElementById("product-search");

let products = [];
cart = JSON.parse(localStorage.getItem("cartInfo")) || [];

getProductData().then((data) => {
  products = data;
  loadProducts(data);
});

// call load cart here 
loadCart();

window.onload = function() {
  history.replaceState(null, null, ' ');
  document.getElementById("product-filter").value = 'All';
  document.getElementById("product-search").value = '';
}

function loadProducts(products) {
  const productContainer = document.getElementById('product-container');
  productContainer.innerHTML = '';

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
        cart.push({id: productData.id, image: productData.image, name: productData.name, price: productData.price, quantity: 1})
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
    
    productContainer.appendChild(card);
  });
}

function loadCart() {
  cart = JSON.parse(localStorage.getItem("cartInfo")) || [];
  
  if (!cart || cart.length == 0) {
    const emptyMsg = document.createElement("p");
    
    emptyMsg.textContent = "Your cart is empty.";
    emptyMsg.classList.add('empty-msg');
 
    cartSection.appendChild(emptyMsg);
  } else {
    const cartContainer = document.createElement("div");
    cartContainer.classList.add("cart-container");
    
    cart.forEach((item) => {
      const cartItem = document.createElement("div");
      cartItem.classList.add("cart-item");

      const img = document.createElement("img");
      
      const cartItemInfo = document.createElement("div");
      cartItemInfo.classList.add("cart-item-info");
      
      const name = document.createElement("p");
      
      const price = document.createElement("p");
      price.classList.add("item-price-quantity");
      
      const quantity = document.createElement("p");
      quantity.classList.add("item-price-quantity");

      img.src = item.image;
      img.alt = item.name;
      name.textContent = item.name;
      price.textContent = `₹${item.price.toLocaleString('en-IN')}`;
      quantity.textContent = `Quantity: ${item.quantity}`;

      cartItemInfo.append(name, quantity, price);
      cartItem.append(img, cartItemInfo);
      cartContainer.appendChild(cartItem);
    });
    const totalContainer = document.createElement("div");

    const subTotalEl = document.createElement("p");
    const discountEl = document.createElement("p");
    const taxEl = document.createElement("p");
    const grandTotalEl = document.createElement("p");

    let total = 0;
    cart.forEach((item) => {
      total += Number(item.price) * Number(item.quantity);
    });
    
    subTotalEl.classList.add('subtotal');
    subTotalEl.innerHTML = `<span>Subtotal</span><span>₹${total.toFixed(2)}</span>`;
    
    let discount = 0; 
    
    if(total > 4999) {
      discount = 0.15;
    } else if (total > 2999) {
      discount = 0.1;
    } else if (total > 1999) {
      discount = 0.05;
    } else {
      discount = 0;
    }

    let discountAmt = 0; 

    if(discount) {
      discountAmt = total * discount;
    }

    discountEl.innerHTML = `<span>Discount</span><span>₹${discountAmt.toFixed(2)}</span>`;

    let tax;

    if (total > 2500) {
      tax = 0.18;
    } else if (total >  1000) {
      tax = 0.12;
    } else {
      tax = 0.05;
    }

    const taxAmt = (total - discountAmt) * tax;
    taxEl.innerHTML = `<span>Tax (${tax*100}%)</span><span>₹${taxAmt.toFixed(2)}</span>`;
    
    const grandTotal = total - discountAmt + taxAmt;

    grandTotalEl.classList.add('grand-total');
    grandTotalEl.innerHTML = `<span>Grand Total</span><span>₹${grandTotal.toFixed(2)}</span>`;

    totalContainer.classList.add("total-container");
    totalContainer.append(subTotalEl, discountEl, taxEl, grandTotalEl);
    
    cartSection.append(cartContainer, totalContainer);
  }
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
      const productContainer = document.getElementById('product-container');
      productContainer.innerHTML = '';

      const message = document.createElement("p");
      message.classList.add('err-message');
      message.textContent = `Couldn't Find Product '${productSearch.value}'`;

      productContainer.appendChild(message);
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
