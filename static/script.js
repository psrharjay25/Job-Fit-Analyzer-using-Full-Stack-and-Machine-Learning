(function () {
	// Functions
	function buildQuiz() {
		// variable to store the HTML output
		const output = [];

		// for each question...
		myQuestions.forEach((currentQuestion, questionNumber) => {
			// variable to store the list of possible answers
			const answers = [];

			// and for each available answer...
			for (letter in currentQuestion.answers) {
				// ...add an HTML radio button
				answers.push(
					`<label>
                <input type="radio" name="question${questionNumber}" value="${letter}">
                ${letter} :
                ${currentQuestion.answers[letter]}
              </label>`
				);
			}

			// add this question and its answers to the output
			output.push(
				`<div class="slide">
              <div class="question"> ${currentQuestion.question} </div>
              <div class="answers"> ${answers.join("")} </div>
            </div>`
			);
		});

		// finally combine our output list into one string of HTML and put it on the page
		quizContainer.innerHTML = output.join("");
	}

	function showResults() {
		//Array for Flask
		var ansFlask = [];
		// gather answer containers from our quiz
		const answerContainers = quizContainer.querySelectorAll(".answers");
		console.log(answerContainers);
		// keep track of user's answers
		let numCorrect = 0;
		console.log(numCorrect);
		// for each question...
		myQuestions.forEach((currentQuestion, questionNumber) => {
			// find selected answer
			const answerContainer = answerContainers[questionNumber];
			//console.log(answerContainer);
			const selector = `input[name=question${questionNumber}]:checked`;
			//console.log(selector);
			const userAnswer = (answerContainer.querySelector(selector) || {})
				.value;
			console.log(userAnswer);
			ansFlask.push(userAnswer);
		});

		// show number of correct answers out of total
		//resultsContainer.innerHTML = `${numCorrect} out of ${myQuestions.length}`;
		document.getElementById("quiz-main").style.display = "none";
		document.getElementById("results").style.display = "flex";
		console.log(ansFlask);
		$.ajax({
			type: "POST",
			contentType: "application/json;charset=utf-8",
			url: "/your/flask/endpoint",
			traditional: "true",
			data: JSON.stringify({ ansFlask }),
			dataType: "json",
		});
	}

	function showSlide(n) {
		slides[currentSlide].classList.remove("active-slide");
		slides[n].classList.add("active-slide");
		currentSlide = n;
		if (currentSlide === 0) {
			previousButton.style.display = "none";
		} else {
			previousButton.style.display = "inline-block";
		}
		if (currentSlide === slides.length - 1) {
			nextButton.style.display = "none";
			submitButton.style.display = "inline-block";
		} else {
			nextButton.style.display = "inline-block";
			submitButton.style.display = "none";
		}
	}

	function showNextSlide() {
		showSlide(currentSlide + 1);
	}

	function showPreviousSlide() {
		showSlide(currentSlide - 1);
	}

	// Variables
	const quizContainer = document.getElementById("quiz");
	const resultsContainer = document.getElementById("results");
	const submitButton = document.getElementById("submit");
	const myQuestions = [
		{
			question: "Who invented JavaScript?",
			answers: {
				a: "Douglas Crockford",
				b: "Sheryl Sandberg",
				c: "Brendan Eich",
			},
		},
		{
			question: "Which one of these is a JavaScript package manager?",
			answers: {
				a: "Node.js",
				b: "TypeScript",
				c: "npm",
			},
		},
		{
			question: "Which tool can you use to ensure code quality?",
			answers: {
				a: "Angular",
				b: "jQuery",
				c: "RequireJS",
				d: "ESLint",
			},
		},
	];

	// Kick things off
	buildQuiz();

	// Pagination
	const previousButton = document.getElementById("previous");
	const nextButton = document.getElementById("next");
	const slides = document.querySelectorAll(".slide");
	let currentSlide = 0;

	// Show the first slide
	showSlide(currentSlide);

	// Event listeners
	submitButton.addEventListener("submit", showResults);
	previousButton.addEventListener("click", showPreviousSlide);
	nextButton.addEventListener("click", showNextSlide);
})();
