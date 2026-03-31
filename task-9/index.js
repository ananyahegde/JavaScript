/*
  This needs API key from corsproxy.io
  Visit https://corsproxy.io/pricing/ for more information. 
  To get a free tier API sign up. 
*/

KEY = ""; // put your API key here

main = document.querySelector(".main");

const max = 3000;
isLoading = false;

// random number generator
function random() {
  return Math.floor(Math.random() * max);
}

// get a single comic
function getComic() {
  if (isLoading) return;
  isLoading = true;

  num = random();
  const BASE_URL = `https://corsproxy.io/?key=${KEY}&url=https://xkcd.com/${num}/info.0.json`;

  fetch(BASE_URL)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);

      card = document.createElement("div");
      card.classList.add("card");

      title = document.createElement("h3");
      img = document.createElement("img");

      title.textContent = data.title;
      img.src = data.img;
      img.alt = data.alt;

      card.appendChild(title);
      card.appendChild(img);
      main.appendChild(card);
    
      isLoading = false;
    })
    .catch((err) => {     // catch network failures
      alert("Something went wrong. Please try again.");
      isLoading = false;
  });
}


// load comic if user is at the bottom
document.addEventListener("scroll", () => {
  if (window.scrollY + window.innerHeight >= document.body.scrollHeight - 200) {
    getComic();
  }
});

// load single comic on page load
getComic();
