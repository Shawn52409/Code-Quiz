var startButton = document.querySelector(".start-button");
var timerElement = document.querySelector("#time-left");
var highscore = document.querySelector("#highscore");
var question = document.querySelector("#question");
var questionText = document.querySelector("#questiontext");
var firstAnswer = document.querySelector("#first-answer");
var secondAnswer = document.querySelector("#second-answer");
var thirdAnswer = document.querySelector("#third-answer");
var fourthAnswer = document.querySelector("#fourth-answer");
var questionFeedback = document.querySelector("#question-feedback");

var highscoreslist = [];
var initials
var correctResponses = ["Correct!!! 😁", "Great Job!!! 🤩", "You Rock!!! 😎", "AWESOME!!! 👍"];
var incorrectResponses = ["WRONG!!! What Were You Thinking?!?!? 🙄", "No Way Jose!!! 😵", "ABSOLUTELY NOT!!! 😡", "No! Quit Guessing!!! 🤦‍♂️"];
var answeredQuestion = false;
var isWin = false;
var timer;
var timerCount;
var currentQuestion = 0;
var userCorrectAnswers = 0;
var highscoresOff = true;

var quizQuestions = [
 {   
     question:  "What does HTML stand for?",
     answers: {
         a: "Hyper Trainer Marking Language",
         b: "Hyper Text Marketing Language",
         c: "Hyper Text Markup Language",
         d: "Hyper Text Markup Leveler"
     },
     correctAnswer: "c"
},
{   
    question:  "What does CSS stand for?",
    answers: {
        a: "Coding Style Sheets",
        b: "Cascading Style Sheets",
        c: "Cool Slick Shoes",
        d: "Cascading Style Syntax"
    },
    correctAnswer: "b"
},
{   
     question:  "Choose the smallest heading",
     answers: {
         a: "<heading>",
         b: "<h1>",
         c: "<head>",
         d: "<h6>"
     },
     correctAnswer: "d"
},
{   
     question:  "Inline CSS applies a unique style over?",
     answers: {
         a: "Single element",
         b: "Multiple elements",
         c: "Whole document",
         d: "Half of the document"
     },
     correctAnswer: "a"
},
{   
     question:  "The test() method of regular expression, is a",
     answers: {
         a: "Comparison method",
         b: "Conversion method",
         c: "Boolean method",
         d: "Reference method"
     },
     correctAnswer: "c"
},
{   
    question:  "Method used to sort an array alphabetically is known to be",
    answers: {
        a: "increase()",
        b: "length(n, n+1)",
        c: "compare()",
        d: "sort()"
    },
    correctAnswer: "d"
},
{   
    question:  "In HTML, the unordered list items are marked with",
    answers: {
        a: "Bullets",
        b: "Numerical",
        c: "Letters",
        d: "Arrows"
    },
    correctAnswer: "a"
},
{   
    question:  "In HTML, the element that defines collecting data from user is called",
    answers: {
        a: "<entry>",
        b: "<textbox>",
        c: "<form>",
        d: "<input>"
    },
    correctAnswer: "c"
},
{   
    question:  "JavaScript is used for",
    answers: {
        a: "Image manipulation",
        b: "form validation",
        c: "dynamic changes in content",
        d: "all of the above"
    },
    correctAnswer: "d"
},
{   
   question:  "Purpose of designing with Javascript",
   answers: {
       a: "To add interactivity to HTML pages",
       b: "To Style HTML pages",
       c: "All of the above",
       d: "None of the above"
   },
   correctAnswer: "a"
}
];


// Start Quiz function is called when the start button is clicked
function startQuiz() {
    $("ol").show();
    timerCount = 60;
    // Prevents start button from being clicked when round is in progress
    startButton.disabled = true;
    // Reset current question count and correct guess count
    currentQuestion = 0;
    userCorrectAnswers = 0;    
    startTimer();
    showQuestions(quizQuestions[currentQuestion]);

};

// check which answer is picked and check if it is correct.
$(".answeritem").on("click",function (evt){
    $answer = $(evt.target);
     
    var q =quizQuestions[currentQuestion]
    var correct = q.answers[q.correctAnswer];
    
    
    console.log(correct);
    console.log($answer.text());
    console.log(correct == $answer.text());
    
    if (correct == $answer.text()){
        userCorrectAnswers++;
        questionFeedback.textContent = correctResponses[Math.floor(Math.random()*3)];
    } else {
        timerCount = timerCount - 10;
        questionFeedback.textContent = incorrectResponses[Math.floor(Math.random()*3)] + " You lose 10 seconds!!!";
    };
    
    // if more questions are left then display next question and answers.
    if (currentQuestion <= 8){
        currentQuestion++
        console.log(quizQuestions[currentQuestion]);
        showQuestions(quizQuestions[currentQuestion]);
    } else {
        timerCount = 0;
    }
})

// prompt for user initials and set counter to zero and display results.
function gameover(){
    $("ol").hide();
    initials= prompt("Please enter your initials");
    initials = initials.toUpperCase();
    questionText.textContent = initials + " correctly answered " + userCorrectAnswers + " questions our of 10 questions."
    questionFeedback.textContent = "You scored a " + (userCorrectAnswers/10 * 100) + "%."
    
    // save current initials and score
    highscoreslist.push(initials,userCorrectAnswers);
    
    // save current initials and score to local storage
    localStorage.setItem("highscoreslist", JSON.stringify(highscoreslist)); 
    
    // re-enable the start quiz button
    startButton.disabled = false;
}

// show questions
function showQuestions(q){
        questionText.textContent = q.question;
        firstAnswer.textContent = q.answers.a;
        secondAnswer.textContent = q.answers.b;
        thirdAnswer.textContent = q.answers.c;
        fourthAnswer.textContent = q.answers.d;
}
  
// The setTimer function starts and stops the timer and triggers winGame() and loseGame()
function startTimer() {
    // Sets timer
    timer = setInterval(function() {
      timerCount--;
      timerElement.textContent = timerCount;
      if (timerCount >= 0) {
        // Tests if win condition is met
        if (isWin && timerCount > 0) {
          // Clears interval and stops timer
          clearInterval(timer);
        }
      }
      // Tests if time has run out
      if (timerCount <= 0) {
        // Clears interval
        clearInterval(timer);
        timerElement.textContent = "0";
        gameover();
      }
    }, 1000);
  }

  // View highscores from local storage when you click highscore
  function viewHighScores(){
    
    if (highscoresOff){  
    storedHs = [];
    storedHs.length = 0;
    highscoresOff = false;
    $("#highscorecontainer").show();
    storedHs = JSON.parse(localStorage.getItem("highscoreslist"));
    console.log(storedHs);
    console.log(storedHs.length)
    // display the highscores saved in local storage
    for (var i = 0; i < storedHs.length; i=i+2){
    $("#highscorelist").append('<li>' + storedHs[i] + " " + storedHs[i+1]+ '</li>');
    }
    } else {
    highscoresOff = true;
    $("#highscorecontainer").hide();
    // remove highscore from screen
    for (var i = 0; i < storedHs.length; i++){
    $("#highscorelist").removeChild('<li></li>');
    }}
}

// Event listener to start button to call startGame function on click
startButton.addEventListener("click", startQuiz);
// Event listener to view high scores section
$("#highscore").on("click", viewHighScores);