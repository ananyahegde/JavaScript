const sections = document.querySelectorAll(".section");

window.onload = function() {
  history.replaceState(null, null, ' ');
}

window.addEventListener("hashchange", () => {
  const target = (location.hash || "#home").substring(1);

  sections.forEach(function(node) {
    node.style.display = "none";
  });

  const page = document.getElementById(target);
  page.style.display = "block";
});
