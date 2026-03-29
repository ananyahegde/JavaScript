inputText = document.getElementById("input-message");
chatBody = document.querySelector(".chat-body");

window.onload = function() {
  inputText.value = '';
}


function sendMessage(e) {
  if (e.key === "Enter") {
    message = e.target.value;
    currTime = new Date().toLocaleTimeString('en-in', { hour12: true, 
                                             hour: "numeric", 
                                             minute: "numeric"}).toUpperCase();

    console.log(message, currTime);

    chatDiv = document.createElement('div');
    textSent = document.createElement('p');
    timestamp = document.createElement('p');

    textSent.textContent = message;
    timestamp.textContent = currTime;

    chatDiv.classList.add("chat-div");
    textSent.classList.add("text");
    timestamp.classList.add("timestamp");
    
    chatBody.appendChild(chatDiv);
    chatDiv.appendChild(textSent);
    textSent.appendChild(timestamp);
    
    inputText.value = '';
  }
}
