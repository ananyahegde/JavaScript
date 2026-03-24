const inputText = document.getElementById("text-input");
const listContainer = document.querySelector(".list-container");

// clear input on refresh
window.onload = function() {
  inputText.value = '';
}

let tasks = [];

// get tasks array from local storage if exists
if (localStorage.getItem("tasks")) {
  tasks = JSON.parse(localStorage.getItem("tasks"));
}

console.log(tasks);

// load initial tasks 
for (i = 0; i < tasks.length; ++i) {
  const li = document.createElement("li");
  
  const input = document.createElement("input");
  input.setAttribute("type", "checkbox"); 
  input.id = i;

  const label = document.createElement("label");
  label.htmlFor = i;
  
  const button = document.createElement("button");

  label.textContent = tasks[i];
  button.innerHTML = "Remove";
  
  button.className = "delete";
  button.onclick = function() { removeTodo(this); }; 

  li.appendChild(input);
  li.appendChild(label);
  li.appendChild(button);
  
  listContainer.appendChild(li);
}

// add a todo task
function addTodo() {
  if (inputText.value === '') {
    alert("Please enter a task name.");
  } else {
      const li = document.createElement("li");
      
      const input = document.createElement("input");
      input.setAttribute("type", "checkbox"); 
      input.id = tasks.length;

      const label = document.createElement("label");
      const button = document.createElement("button");

      label.textContent = inputText.value;
      label.htmlFor = tasks.length;

      button.innerHTML = "Remove";
      
      button.className = "delete";
      button.onclick = function() { removeTodo(this); }; 

      li.appendChild(input);
      li.appendChild(label);
      li.appendChild(button);
      
      listContainer.appendChild(li);
      
      // store the task in the array and save that to local storage
      tasks.push(inputText.value);
      localStorage.setItem("tasks", JSON.stringify(tasks));
      
      inputText.value = '';
  }
}

// remove a todo task
function removeTodo(btn) {
  if (confirm("Remove Task? This action cannot be undone.") == true) {
    btn.parentElement.remove();
    alert("Task removed.");
    
    const li = btn.parentElement;
    const checkbox = li.querySelector("input");
    const id = checkbox.id;

    tasks.splice(id, 1);
    
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }
}
