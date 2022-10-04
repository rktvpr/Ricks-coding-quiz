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
        question: "What does HTML stand for?",
        mC: ["Hyper Text Markup Language", "Happy to meet ladies", "Hidden task markup location", "Happy to make lines"],
        correct: "Hyper Text Markup Language"
    },
    {
        question: "What does an event listener do?",
        mC: ["nothing", "links a button to an event", "links html to JS", "links HTML to CSS"],
        correct: "links a button to an event"
    },
    {
        question: "What does CSS do on a website?",
        mC: ["Inputs text to webpage", "Makes the webpage go super saiyan 2", "styles the website", "Inputs functionality to webpage"],
        correct: "styles the website"
    },
    {
        question: "What does a variable do?",
        mC: ["stores styling properties", "declares an object", "Adds a click event", "It does my taxes"],
        correct: "declares an object"
    },
    {
        question: "What is Vegeta's final form?",
        mC: ["Susano", "Super Saiyan", "Ultra Instinct", "Ultra Ego"],
        correct: "Ultra Ego"
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

//ends quiz for user
function endQuiz() {
    answers.innerHTML = ""
    questionIndex = 0
    question.innerHTML = "Your Score is " + score + "!"
    //creates an h1 element
    const createheader = document.createElement("h1")
    //gives our const an id
    createheader.id = "createheader"
    createheader.textContent = "Congrats! You finished!"
    quizContainer.appendChild(createheader)
    //creates a p tag
    const createparagraph = document.createElement("p");
    createparagraph.id = "createparagraph"
    quizContainer.appendChild(createparagraph)
}
//creates an input to put your initials
const scoreboard = document.createElement("label")
scoreboard.id = "createScoreboard"
scoreboard.textcontent = "What are your initials?"
quizContainer.appendChild(scoreboard)
// allows user to input initials... creates input element
const Initials = document.createElement("input")
Initials.type = "text"
Initials.id = "initials"
// creates an empty string for the user to be able to input initials
Initials.textContent = ""
quizContainer.appendChild(Initials)
//creates button to submit initials
const SavedInit = document.createElement("button")
SavedInit.type = "Submit"
SavedInit.id = "Submit"
SavedInit.textContent = "Submit"
quizContainer.appendChild(SavedInit)
//stores our scores and variables in local storage
SavedInit.addEventListener("click", function () {
    var FirstLast = Initials.value;
    //gives message if nothing is inputed
    if (FirstLast === "") {
        console.log("Please try again!");
    } else {
        //lists final score 
        var finalScore = {
            Firstlast: FirstLast
        }
        console.log(finalScore)
        var scoreList = localStorage.getItem("scoreList")
        if (scoreList === null) {
            scoreList = []
        } else {
            scoreList = JSON.parse(scoreList)
        }
        scoreList.push(finalScore)
        var UpdatedScore = JSON.stringify(scoreList)
        localStorage.setItem("scoreList", UpdatedScore)
        window.location.replace("scores.html")
    }
})

