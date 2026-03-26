home_screen = document.getElementById("home-screen");
game_screen = document.getElementById("game-screen");
end_screen = document.getElementById("end-screen");

progressBarFill = document.getElementById("progress-bar-fill");
nextBtn = document.getElementById("next-btn");

question = document.getElementById("question");

opt1 = document.getElementById("opt1");
opt2 = document.getElementById("opt2");
opt3 = document.getElementById("opt3");
opt4 = document.getElementById("opt4");

finalScore = document.getElementById("final-score");
scoreFeedback = document.getElementById("score-feedback");

game_screen.style.display = "none";
end_screen.style.display = "none";

let data, idx, currentQ, finalOptSelected;
let userAnswers = [];
let correctAnswers = [];

const feedback = {
  0: "Every expert was once a beginner. Keep going!",
  1: "Every expert was once a beginner. Keep going!",
  2: "Not bad for a warm up. Try again!",
  3: "Solid effort! You're getting there.",
  4: "Almost perfect! One more try?",
  5: "Brilliant! You nailed it."
};


function fisherYatesShuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}


// get questions from external JSON and get random 5 indeces
fetch('./questions.json')
  .then(res => res.json())
  .then(json => {
    data = json;
    idx = fisherYatesShuffle([...Array(20).keys()]).slice(0, 5);
  });


function populateQ(currentQ) {
  console.log(currentQ, idx, data);
  home_screen.style.display = "none";
  game_screen.style.display = "block";

  progressBarFill.style.width = (currentQ / 5 * 100) + "%";

  // populate HTML
  question.textContent = data[idx[currentQ-1]].question;

  opt1.textContent = data[idx[currentQ-1]].options[0];
  opt2.textContent = data[idx[currentQ-1]].options[1];
  opt3.textContent = data[idx[currentQ-1]].options[2];
  opt4.textContent = data[idx[currentQ-1]].options[3];
}


function selectOption(id) {
  const optSelected = document.getElementById(id);
  
  document.querySelectorAll('.option-btn').forEach(btn => {
    btn.classList.remove('selected');
  });

  optSelected.classList.add('selected');
  finalOptSelected = optSelected.textContent;
}

function nextQ() {
  document.querySelectorAll('.option-btn').forEach(btn => {
    btn.classList.remove('selected');
  });

  userAnswers.push(finalOptSelected);
  currentQ++;
  
  if (currentQ === 5) {
    nextBtn.textContent = "Finish";
  }
  if (currentQ === 6) {
    game_screen.style.display = "none";
    end_screen.style.display = "block";
    
    for (var i = 0; i < 5; i++) {
      correctAnswers.push(data[idx[i]].answer);
    }

    const score = userAnswers.filter(value => correctAnswers.includes(value)).length;
    console.log(userAnswers, correctAnswers, score);
    
    finalScore.textContent = `Your Score: ${score}`;
    scoreFeedback.textContent = feedback[score];

    return;
  }

  populateQ(currentQ);
}
