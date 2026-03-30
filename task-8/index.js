section = document.querySelectorAll(".section");

// remove the hash on page reload
window.onload = function() {
  history.replaceState(null, null, ' ');
}

window.addEventListener("hashchange", () => {
  const target = (location.hash || "#home").substring(1); 
  
  section.forEach(function (node) {
      node.style.display = "none";
  });

  const page = document.getElementById(target);
  page.style.display = "block";
});
