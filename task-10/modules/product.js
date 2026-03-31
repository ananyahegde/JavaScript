// fetch the data from product.js and return the data

function getProductData() {
  return fetch('./assets/products.json')
    .then((res) => res.json())
    .then((data) => {
      return data;
    })
    .catch((err) => {
      alert("Something went wrong.");
  })
}

export default getProductData;
