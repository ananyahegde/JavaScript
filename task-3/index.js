overlay = document.querySelector(".overlay");
let src, id, clickedImg;

function handleImageClick(img) {
  src = img.src;
  id = img.id;

  clickedImg = document.createElement('img');
  clickedImg.setAttribute("src", src);
  clickedImg.setAttribute("id", id);

  overlay.appendChild(clickedImg);

  overlay.classList.add("show");
  console.log("Im here.");
}

function closeImage() {
  overlay.removeChild(clickedImg);
  overlay.classList.remove("show");
}
