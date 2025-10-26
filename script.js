document.addEventListener("DOMContentLoaded", () => {
  const STORAGE_USER = "rps_userScore";
  const STORAGE_CPU = "rps_cpuScore";

  localStorage.setItem(STORAGE_USER, "0");
  localStorage.setItem(STORAGE_CPU, "0");

  let userScore = 0;
  let cpuScore = 0;

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

  renderScores();

  function saveScores() {
    localStorage.setItem(STORAGE_USER, userScore);
    localStorage.setItem(STORAGE_CPU, cpuScore);
  }

  function clearRings() {
    bigCircle.classList.remove(
      "ring-rock",
      "ring-paper",
      "ring-scissors",
      "winner",
      "user-win-ring"
    );
    smallCircle.classList.remove("ring-rock", "ring-paper", "ring-scissors", "winner");
    choiceButtons.forEach((b) =>
      b.classList.remove(
        "selected",
        "cpu-selected",
        "ring-rock",
        "ring-paper",
        "ring-scissors"
      )
    );
  }

  function resetUI() {
    resultScreen.classList.add("hidden");
    hurryFull.classList.add("hidden");
    clearRings();
    gameChoicesSection.classList.remove("hidden");
    nextBtn.classList.add("hidden");
    centerResult.innerHTML = `RESULT<br/><span class="small">AGAINST PC</span>`;
    choiceButtons.forEach((b) => (b.disabled = false));
  }

  choiceButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      clearRings();
      hurryFull.classList.add("hidden");

      const userChoice = btn.getAttribute("data-choice");
      btn.classList.add("selected");

      const cpuChoice = choices[Math.floor(Math.random() * choices.length)];
      const cpuBtn = Array.from(choiceButtons).find(
        (b) => b.getAttribute("data-choice") === cpuChoice
      );
      if (cpuBtn) cpuBtn.classList.add("cpu-selected");

      let resultClass = "";
      if (userChoice === cpuChoice) {
        resultClass = "tie";
      } else if (
        (userChoice === "rock" && cpuChoice === "scissors") ||
        (userChoice === "scissors" && cpuChoice === "paper") ||
        (userChoice === "paper" && cpuChoice === "rock")
      ) {
        resultClass = "win";
        userScore++;
        bigCircle.classList.add("ring-" + userChoice, "user-win-ring");
        nextBtn.classList.remove("hidden");
      } else {
        resultClass = "lose";
        cpuScore++;
        smallCircle.classList.add("ring-" + cpuChoice, "winner");
        nextBtn.classList.add("hidden");
      }

      bigCircle.classList.add("ring-" + userChoice);
      smallCircle.classList.add("ring-" + cpuChoice);

      const imgFor = (choice) => {
        const el = Array.from(choiceButtons).find(
          (b) => b.getAttribute("data-choice") === choice
        );
        return { src: el?.querySelector("img")?.getAttribute("src") || "", alt: choice };
      };
      const u = imgFor(userChoice),
        p = imgFor(cpuChoice);
      userImg.src = u.src;
      userImg.alt = u.alt;
      pcImg.src = p.src;
      pcImg.alt = p.alt;

      choiceButtons.forEach((b) => (b.disabled = true));
      resultScreen.classList.remove("hidden");
      gameChoicesSection.classList.add("hidden");

      centerResult.innerHTML =
        resultClass === "win"
          ? '<span class="main-text" style="font-weight:700; font-size:32px; color:#fff;">YOU WIN</span><br/><span class="small" style="font-size:16px; font-weight:500;">AGAINST PC</span>'
          : resultClass === "lose"
          ? '<span class="main-text" style="font-weight:700; font-size:32px; color:#fff;">YOU LOSE</span><br/><span class="small" style="font-size:16px; font-weight:500;">AGAINST PC</span>'
          : '<span class="main-text" style="font-weight:700; font-size:32px; color:#fff;">TIE</span><br/><span class="small" style="font-size:16px; font-weight:500;">AGAINST PC</span>';

      saveScores();
      renderScores();
    });
  });

  playAgainBtn.addEventListener("click", resetUI);

  nextBtn.addEventListener("click", () => {
    resultScreen.classList.add("hidden");
    gameChoicesSection.classList.add("hidden");
    hurryFull.classList.remove("hidden");
    nextBtn.classList.add("hidden");
  });

  hurryFullPlay.addEventListener("click", () => {
    hurryFull.classList.add("hidden");
    resetUI();
  });

  rulesBtn.addEventListener("click", () => rulesModal.classList.remove("hidden"));
  closeRules.addEventListener("click", () => rulesModal.classList.add("hidden"));

  resetUI();
});
