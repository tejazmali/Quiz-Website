



         // Hide the loader once the content is fully loaded
         window.addEventListener("load", function () {
            const loader = document.getElementById("loader");
            loader.style.display = "none";
          });



          


let timerInterval; // To store the interval ID
      let timeLeft = 10; // Set the starting time in seconds

      function startTimer() {
        const timerDisplay = document.getElementById("time-remaining");
        const timerContainer = document.getElementById("timer");
        const startButton = document.getElementById("start-timer-btn");

        // Display the timer and hide the start button
        timerContainer.classList.remove("hidden");
        startButton.classList.add("hidden");

        // Initialize the timer display
        timerDisplay.textContent = formatTime(timeLeft);

        // Start the countdown
        timerInterval = setInterval(() => {
          timeLeft--;
          timerDisplay.textContent = formatTime(timeLeft);

          if (timeLeft <= 0) {
            clearInterval(timerInterval);
            timerDisplay.textContent = "Time's Up!";
            showTimeUpMessage();
          }
        }, 1000);
      }

      function resetTimer() {
        clearInterval(timerInterval); // Clear the interval
        timeLeft = 10; // Reset time to the starting value
        const timerDisplay = document.getElementById("time-remaining");
        const timerContainer = document.getElementById("timer");
        const startButton = document.getElementById("start-timer-btn");

        timerDisplay.textContent = ""; // Clear timer display
        timerContainer.classList.add("hidden"); // Hide the timer
        startButton.classList.remove("hidden"); // Show the start button
      }

      function formatTime(seconds) {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, "0")}`;
      }

      let currentQuestionIndex = 0;

      // Elements
      const questionText = document.getElementById("question-text");
      const optionsList = document.getElementById("options-list");
      const feedbackDiv = document.getElementById("feedback");
      const explanationDiv = document.getElementById("explanation");
      const nextBtn = document.getElementById("next-btn");
      const backBtn = document.getElementById("back-btn");

      const optionLabels = ["A", "B", "C", "D"];

      // Load the first question
      loadQuestion();

      function loadQuestion() {
        const question = questions[currentQuestionIndex];
        questionText.innerHTML = question.question;
        optionsList.innerHTML = "";
        feedbackDiv.classList.add("hidden");
        explanationDiv.classList.add("hidden");
        nextBtn.classList.add("hidden");
        backBtn.classList.remove("hidden");

        question.options.forEach((option, index) => {
          const li = document.createElement("li");
          li.innerHTML = `
      <span class="option-label">${optionLabels[index]}.</span>
      <span class="option-text">${option}</span>
      <svg class="icon" id="icon-${index}" xmlns="http://www.w3.org/2000/svg"></svg>
    `;
          li.onclick = () =>
            checkAnswer(li, option, question.correct, `icon-${index}`);
          optionsList.appendChild(li);
        });
      }

      function checkAnswer(selectedOption, chosen, correct, iconId) {
        const options = document.querySelectorAll(".options li");
        options.forEach((opt) => (opt.onclick = null));

        if (chosen === correct) {
          selectedOption.classList.add("correct");
          setIcon(iconId, "check");
        } else {
          selectedOption.classList.add("incorrect");
          setIcon(iconId, "cross");
          options.forEach((opt, idx) => {
            if (opt.querySelector(".option-text").textContent === correct) {
              opt.classList.add("correct");
              setIcon(`icon-${idx}`, "check");
            }
          });
        }

        feedbackDiv.classList.remove("hidden");
        explanationDiv.innerHTML = `<strong>Solution:</strong><br> ${questions[currentQuestionIndex].explanation}`;
        explanationDiv.classList.remove("hidden");
        nextBtn.classList.remove("hidden");
      }

      function setIcon(iconId, type) {
        const icon = document.getElementById(iconId);
        if (type === "check") {
          icon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
      <path fill="#28a745" d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209L241 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L335 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z"/>
    </svg>`; // green check mark
        } else if (type === "cross") {
          icon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
      <path fill="#dc3545" d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM175 175c9.4-9.4 24.6-9.4 33.9 0l47 47 47-47c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-47 47 47 47c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-47-47-47 47c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l47-47-47-47c-9.4-9.4-9.4-24.6 0-33.9z"/>
    </svg>`; // red cross
        }
      }

      function loadNextQuestion() {
        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
          loadQuestion();
        } else {
          questionText.innerHTML = "🎉 Quiz Completed! ";
          optionsList.innerHTML = "";
          feedbackDiv.textContent = "";
          explanationDiv.textContent = "";
          nextBtn.classList.add("hidden");
          backBtn.classList.add("hidden");
        }
      }

      function loadPreviousQuestion() {
        if (currentQuestionIndex > 0) {
          currentQuestionIndex--;
          loadQuestion();
        }
      }
      function loadNextQuestion() {
        resetTimer(); // Reset the timer
        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
          loadQuestion();
        } else {
          questionText.innerHTML = `
<div class="completion-message">
  🎉  This Round Completed! Great job! 🎉
  <br>
  <img 
    src="https://cdn.dribbble.com/users/2185205/screenshots/7886140/media/90211520c82920dcaf6aea7604aeb029.gif" 
    alt="Celebration GIF" 
    class="completion-gif"
  />
   <br>
        <a href="/start-page/round-2-start.html" class="completion-btn">
          <button>Next Round</button>
        </a>
</div>
`;
          optionsList.innerHTML = "";
          feedbackDiv.textContent = "";
          explanationDiv.textContent = "";
          nextBtn.classList.add("hidden");
          backBtn.classList.add("hidden");

          // Optional: Add a confetti effect
          addConfettiEffect();
        }
      }

      // Confetti Effect (Optional)
      function addConfettiEffect() {
        const confettiContainer = document.createElement("div");
        confettiContainer.setAttribute("id", "confetti");
        document.body.appendChild(confettiContainer);

        for (let i = 0; i < 100; i++) {
          const confetti = document.createElement("div");
          confetti.classList.add("confetti");
          confetti.style.left = `${Math.random() * 100}%`;
          confetti.style.animationDelay = `${Math.random()}s`;
          confetti.style.backgroundColor = `hsl(${
            Math.random() * 360
          }, 100%, 50%)`; // Random colors
          confettiContainer.appendChild(confetti);
        }

        // Remove confetti after a delay
        setTimeout(() => {
          confettiContainer.remove();
        }, 3000);
      }



