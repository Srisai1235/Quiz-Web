const apiKey = "YOUR_OPENAI_API_KEY"; // Replace with your actual API key

async function fetchQuizQuestion() {
    const prompt = "Generate a multiple-choice quiz question with four options and the correct answer.";
    
    const response = await fetch("https://api.openai.com/v1/completions", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${apiKey}`
        },
        body: JSON.stringify({
            model: "text-davinci-003",
            prompt: prompt,
            max_tokens: 100
        })
    });

    const data = await response.json();
    return parseQuizQuestion(data.choices[0].text);
}

function parseQuizQuestion(text) {
    const lines = text.split("\n").filter(line => line.trim() !== "");
    const question = lines[0];
    const options = lines.slice(1, 5);
    const answer = lines[5].replace("Answer: ", "").trim();

    return { question, options, answer };
}

let currentQuestion;
let score = 0;

async function loadQuestion() {
    currentQuestion = await fetchQuizQuestion();
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
}

function checkAnswer(selected) {
    if (selected === currentQuestion.answer) {
        score++;
        alert("Correct!");
    } else {
        alert(`Wrong! The correct answer is ${currentQuestion.answer}`);
    }
    document.getElementById("nextBtn").style.display = "block";
}

function nextQuestion() {
    loadQuestion();
    document.getElementById("nextBtn").style.display = "none";
}

loadQuestion();
