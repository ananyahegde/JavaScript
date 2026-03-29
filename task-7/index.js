inputText = document.getElementById("input-message");
chatBody = document.querySelector(".chat-body");

const replies = [
  "Haha no way!",
  "That's so cool!",
  "Omg really?",
  "Tell me more!",
  "I had no idea!",
  "Wait what?!",
  "Lol same honestly",
  "That's hilarious",
  "No way that happened",
  "I can't believe it!",
  "Sounds fun!",
  "Miss you too!",
  "We should hang out soon",
  "Agreed 100%",
  "You're so right about that"
];

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
    
    setTimeout(() => {
      replyMessage = replies[Math.floor(Math.random() * 15)]
      replyTime = new Date().toLocaleTimeString('en-in', { hour12: true, 
                                             hour: "numeric", 
                                             minute: "numeric"}).toUpperCase();

    replyDiv = document.createElement('div');
    replyText = document.createElement('p');
    replyTimestamp = document.createElement('p');

    replyText.textContent = replyMessage;
    replyTimestamp.textContent = replyTime;

    replyDiv.classList.add("chat-div-left");
    replyText.classList.add("text");
    replyTimestamp.classList.add("timestamp");
    
    chatBody.appendChild(replyDiv);
    replyDiv.appendChild(replyText);
    replyText.appendChild(replyTimestamp);
    }, 2500);
  }
}
