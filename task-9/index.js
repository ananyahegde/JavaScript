KEY = ""; // put your API key here

const max = 3000;

function random() {
  return Math.floor(Math.random() * max);
}

function getComic() {
  num = random();
  const BASE_URL = `https://corsproxy.io/?key=${KEY}&url=https://xkcd.com/${num}/info.0.json`;

  fetch(BASE_URL)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
    })
    .catch((err) => {     // catch network failures
      alert("Something went wrong. Please try again.");
  });
}

getComic();

