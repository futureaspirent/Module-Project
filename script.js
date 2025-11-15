document.addEventListener("DOMContentLoaded", () => {
  const STORAGE_USER = "rps_userScore";
  const STORAGE_CPU = "rps_cpuScore";

  let userScore = parseInt(localStorage.getItem(STORAGE_USER)) || 0;
  let cpuScore = parseInt(localStorage.getItem(STORAGE_CPU)) || 0;

  const choices = ["rock", "paper", "scissors"];
  const userScoreDisplay = document.getElementById("userScore");
  const cpuScoreDisplay = document.getElementById("cpuScore");
  const choiceButtons = document.querySelectorAll(".choice-btn");
  const userImg = document.querySelector(".user-img");
  const pcImg = document.querySelector(".pc-img");
  const bigCircle = document.querySelector(".big-circle");
  const smallCircle = document.querySelector(".small-circle");
  const centerResult = document.getElementById("centerResult");
  const resultScreen = document.getElementById("resultScreen");
  const gameChoicesSection = document.querySelector(".game-choices");
  const playAgainBtn = document.getElementById("playAgainBtn");
  const nextBtn = document.getElementById("nextBtn");
  const hurryFull = document.getElementById("hurryFull");
  const hurryFullPlay = document.getElementById("hurryFullPlay");
  const rulesBtn = document.getElementById("rulesBtn");
  const rulesModal = document.getElementById("rulesModal");
  const closeRules = document.getElementById("closeRules");

  function renderScores() {
    userScoreDisplay.textContent = userScore;
    cpuScoreDisplay.textContent = cpuScore;
  }

  function saveScores() {
    localStorage.setItem(STORAGE_USER, userScore);
    localStorage.setItem(STORAGE_CPU, cpuScore);
  }

  function resetUI() {
    resultScreen.classList.add("hidden");
    hurryFull.classList.add("hidden");
    gameChoicesSection.classList.remove("hidden");
    nextBtn.classList.add("hidden");

    // FIXED: Clear Rings
    bigCircle.classList.remove("winner-pick");
    smallCircle.classList.remove("winner-pick");

    choiceButtons.forEach(b => {
      b.classList.remove("selected", "cpu-selected");
      b.disabled = false;
    });

    centerResult.innerHTML = `RESULT<br/><span class="small">AGAINST PC</span>`;
  }

  choiceButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      const userChoice = btn.getAttribute("data-choice");
      btn.classList.add("selected");

      const cpuChoice = choices[Math.floor(Math.random() * choices.length)];
      const cpuBtn = Array.from(choiceButtons).find(b => b.getAttribute("data-choice") === cpuChoice);
      if (cpuBtn) cpuBtn.classList.add("cpu-selected");

      let resultText = "";
      let isUserWin = false;

      if (userChoice === cpuChoice) {
        resultText = "TIE";
      } else if (
        (userChoice === "rock" && cpuChoice === "scissors") ||
        (userChoice === "scissors" && cpuChoice === "paper") ||
        (userChoice === "paper" && cpuChoice === "rock")
      ) {
        resultText = "YOU WIN";
        userScore++;
        isUserWin = true;
        bigCircle.classList.add("winner-pick"); // Static rings on user
      } else {
        resultText = "YOU LOSE";
        cpuScore++;
        smallCircle.classList.add("winner-pick"); // Static rings on PC
      }

      const getImg = (choice) => {
        const el = Array.from(choiceButtons).find(b => b.getAttribute("data-choice") === choice);
        return { src: el.querySelector("img").src, alt: choice };
      };
      const u = getImg(userChoice), p = getImg(cpuChoice);
      userImg.src = u.src; userImg.alt = u.alt;
      pcImg.src = p.src; pcImg.alt = p.alt;

      choiceButtons.forEach(b => b.disabled = true);
      resultScreen.classList.remove("hidden");
      gameChoicesSection.classList.add("hidden");

      centerResult.innerHTML = `<span class="main-text" style="font-weight:700; font-size:32px; color:#fff;">${resultText}</span><br/><span class="small" style="font-size:16px; font-weight:500;">AGAINST PC</span>`;

      if (isUserWin) {
        nextBtn.classList.remove("hidden");
      } else {
        nextBtn.classList.add("hidden");
      }

      saveScores();
      renderScores();
    });
  });

  playAgainBtn.addEventListener("click", resetUI);

  nextBtn.addEventListener("click", () => {
    resultScreen.classList.add("hidden");
    hurryFull.classList.remove("hidden");
  });

  hurryFullPlay.addEventListener("click", () => {
    hurryFull.classList.add("hidden");
    resetUI();
  });

  rulesBtn.addEventListener("click", () => rulesModal.classList.remove("hidden"));
  closeRules.addEventListener("click", () => rulesModal.classList.add("hidden"));

  renderScores();
  resetUI();
});
