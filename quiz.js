const quizQuestions = [
    {
        question: "What is the capital of France?",
        options: ["Berlin", "Madrid", "Paris", "Rome"],
        answer: "Paris"
    },
    {
        question: "Which programming language is known as the language of the web?",
        options: ["Python", "Java", "C++", "JavaScript"],
        answer: "JavaScript"
    },
    {
        question: "What is 5 + 7?",
        options: ["10", "11", "12", "13"],
        answer: "12"
    }
];

let currentQuestionIndex = 0;
let score = 0;

function loadQuestion() {
    const currentQuestion = quizQuestions[currentQuestionIndex];
    document.getElementById("question").innerText = currentQuestion.question;
    
    const optionsContainer = document.getElementById("options");
    optionsContainer.innerHTML = "";

    currentQuestion.options.forEach(option => {
        const button = document.createElement("button");
        button.innerText = option;
        button.classList.add("option");
        button.onclick = () => checkAnswer(option);
        optionsContainer.appendChild(button);
    });

    document.getElementById("nextBtn").style.display = "none";
}

function checkAnswer(selected) {
    const currentQuestion = quizQuestions[currentQuestionIndex];

    if (selected === currentQuestion.answer) {
        score++;
        alert("Correct!");
    } else {
        alert(`Wrong! The correct answer is ${currentQuestion.answer}`);
    }

    document.getElementById("nextBtn").style.display = "block";
}

function nextQuestion() {
    currentQuestionIndex++;

    if (currentQuestionIndex < quizQuestions.length) {
        loadQuestion();
    } else {
        alert(`Quiz Completed! Your score: ${score}/${quizQuestions.length}`);
        currentQuestionIndex = 0;
        score = 0;
        loadQuestion();
    }
}

loadQuestion();
