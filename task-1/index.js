const inputText = document.getElementById("text-input");
const listContainer = document.querySelector(".list-container");

// clear input on refresh
window.onload = function() {
  inputText.value = '';
}

// add a todo task
function addTodo() {
  if (inputText.value === '') {
    alert("Please enter a task name.");
  } else {
      console.log("Im here 1");
      const li = document.createElement("li");
      
      const input = document.createElement("input");
      input.setAttribute("type", "checkbox"); 
      
      const label = document.createElement("label");
      const button = document.createElement("button");

      label.textContent = inputText.value;
      button.innerHTML = "Remove";
      
      button.className = "delete";
      button.onclick = function() { removeTodo(this); }; 

      li.appendChild(input);
      li.appendChild(label);
      li.appendChild(button);
      
      listContainer.appendChild(li);
  }
}

// remove a todo task
function removeTodo(btn) {
  if (confirm("Remove Task? This action cannot be undone.") == true) {
    btn.parentElement.remove();
    alert("Task removed.");
  }
}

