// Fetch trivia questions from the Trivia API
let questions = [];
let score = 0;
let question = 20;
const scoreEl = document.getElementById("score");
const qEl = document.getElementById("qs");

let category = 12;
let i = 0;
const fetchTriviaQuestions = async () => {
	const response = await fetch(
		`https://opentdb.com/api.php?amount=${question}&category=${category}&type=multiple`
	);
	const data = await response.json();

	return data.results;
};

// Display a trivia question
const displayTriviaQuestion = (target) => {
	const quizApp = document.querySelector("#quiz-app");
	quizApp.innerHTML = `
   <div class=main-container>
  <div class="question">${target.question}</div>
  <div class="answers">
    <div class="answer cr">(a) ${target.correct_answer} </div>
    <div class="answer">(b) ${target.incorrect_answers[0]}</div>
    <div class="answer">(c) ${target.incorrect_answers[1]}</div>
    <div class="answer">(d) ${target.incorrect_answers[2]}</div>
  </div>
</div>
  `;

	// Get the correct answer element
	const correctAnswer = document.querySelector(".cr");
	// Add an event listener to the quiz app element
	quizApp.addEventListener("click", (event) => {
		// Check if the target element is an answer button
		if (event.target.classList.contains("answer")) {
			// Check if the answer is correct
			if (event.target.innerHTML === correctAnswer.innerHTML) {
				// The answer is correct
				event.target.classList.add("correct");
				quizApp.computedStyleMap.mousee;
				score++;
				scoreEl.textContent = score;
			} else {
				// The answer is incorrect
				event.target.classList.add("incorrect");
				correctAnswer.classList.add("correct");
			}

			qEl.textContent = i + 1;
		}
	});
};

// Start the quiz
const startQuiz = async () => {
	// Fetch trivia questions
	questions = await fetchTriviaQuestions();

	// Display the first question
	displayTriviaQuestion(questions[i]);
};

const answers = document.getElementsByClassName("answers");

// Get the next button element
const nextButton = document.querySelector("#next-button");
const prevButton = document.querySelector("#prev-button");

// Get the quiz app element

// Add an event listener to the next button
nextButton.addEventListener("click", () => {
	// Get the current question index
	i++;

	// Increment the current question index

	// If the current question index is greater than the last question index, then the quiz is over
	if (i === questions.length - 1) {
		nextButton.innerHTML = "Submit";
	}

	if (i > questions.length - 1) {
		displayScoreModal(score);
		return;
	}
	qEl.textContent = i + 1;

	// Display the next question
	displayTriviaQuestion(questions[i]);
});
prevButton.addEventListener("click", () => {
	i--;

	// If the current question index is greater than the last question index, then the quiz is over
	if (i < 0) {
		i = 0;
		return;
	}

	if (i != questions.length - 1) {
		nextButton.innerHTML = "Next";
	}
	qEl.textContent = i + 1;
	// Display the next question
	displayTriviaQuestion(questions[i]);
});

function displayScoreModal(score) {
	const modal = document.getElementById("scoreModal");
	const scoreValue = document.getElementById("scoreValue");
	scoreValue.textContent = `Score: ${score}`;
	modal.style.display = "block";

	// Close the modal when the "x" button is clicked
	const closeBtn = document.querySelector(".close");
	closeBtn.addEventListener("click", () => {
		modal.style.display = "none";
	});
}

// Example usage: display the modal with a score of 85

// Start the quiz
startQuiz();
