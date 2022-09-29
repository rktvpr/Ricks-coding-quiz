//defined our variables
var intro = document.querySelector(".intro")
var start = document.querySelector(".start")
var quizContainer = document.querySelector(".quizContainer")
var question = document.querySelector(".question")
var answers = document.querySelector(".answers")
var timeContent = document.querySelector(".timer")
var time = 60
var interval = 0
var questionIndex = 0
var score = 0
// hides the quiz container on the homescreen
quizContainer.style.display = "none"
//starts the timer for the quiz as well as displays the quiz container for user to start
start.addEventListener("click", function () {
    intro.style.display = "none"
    quizContainer.style.display = "block"
    if (interval === 0) {
        interval = setInterval(function () {
            time--
            timeContent.innerHTML = "Time: " + time
            if (time <= 0) {
                clearInterval(interval)
                timeContent.innerHTML = "Times up"
            }
        }, 1000);
    }
    displayQuestions(questionIndex)
})
//questions, answers, and solutions stored in a variable 
var questions = [
    {
        question: "this is question 1",
        mC: ["answer 1", "answer 2", "answer 3", "answer 4"],
        correct: "answer 1"
    },
    {
        question: "this is question 2",
        mC: ["answer 1", "answer 2", "answer 3", "answer 4"],
        correct: "answer 1"
    },
    {
        question: "this is question 3",
        mC: ["answer 1", "answer 2", "answer 3", "answer 4"],
        correct: "answer 1"
    },
    {
        question: "this is question 4",
        mC: ["answer 1", "answer 2", "answer 3", "answer 4"],
        correct: "answer 1"
    },
    {
        question: "this is question 5",
        mC: ["answer 1", "answer 2", "answer 3", "answer 4"],
        correct: "answer 1"
    }
]
//displays questions and answers in the order stored above
function displayQuestions(questionIndex) {
    question.innerHTML = ""
    answers.innerHTML = ""
    let userQuestion = questions[questionIndex].question;
    let userAnswers = questions[questionIndex].mC
    question.innerHTML = userQuestion
    userAnswers.forEach(function (nextAnswer) {
        let listItem = document.createElement("li")
        listItem.innerHTML = nextAnswer
        answers.appendChild(listItem)
        listItem.addEventListener("click", (correct))
    })
}

function correct(event) {
    let element = event.target
    if (element.matches("li")) {
        // if answer clicked is = correct then score will increase otherwise decrease
        if (element.textContent == questions[questionIndex].correct) {
            score++
        } else {
            score--
            if (score < 0) {
                score = 0
            }
        }
        questionIndex++
        if (questionIndex >= questions.length) {
            endQuiz()
        } else {
            displayQuestions(questionIndex)
        }
    }
}

function endQuiz() {
    questionIndex = 0
    question.innerHTML = "Your Score is " + score + "!"
    

}