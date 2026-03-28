const itemContainer = document.querySelector('.itemContainer');
const items = document.querySelectorAll('.item');

let dragged; 
let dropTarget;

function dragstartHandler(e) {
  dragged = e.target;
  console.log(dragged);
}

function dragoverHandler(e) {
  e.preventDefault();
}

function dropHandler(e) {
  dropTarget = e.target;
  itemContainer.insertBefore(dragged, dropTarget);
  event.target.classList.remove("dragover");
}

for (item of items) {
  item.addEventListener("dragenter", (event) => {
    event.target.classList.add("dragover");
  });
} 

for (item of items) {
  item.addEventListener("dragleave", (event) => {
    event.target.classList.remove("dragover");
  });
}
