const quizQuestions = [
     {
        question:"The Centre for Cellular and Molecular Biology is situated at",
        answer:[
            {text:"Patna" , correct: false},
            {text:"Jaipur" , correct: false},
            {text:"Hyderabad" , correct: true},
            {text:"New Delhi" , correct: false},
        ]
    },
     {
        question:"Where is the Railway Staff College located?",
        answer:[
            {text:"Pune" , correct: false},
            {text:"Vadodara" , correct: true},
            {text:"Allahabad" , correct: false},
            {text:"Delhi" , correct: false},
        ]
    },
     {
        question:" Which of the following is used in pencils?",
        answer:[
            {text:"Graphite" , correct: true},
            {text:"Silicon" , correct: false},
            {text:"Charcoal" , correct: false},
            {text:"Phosphorous" , correct: false},
        ]
    },
     {
        question:"Chemical formula for water is",
        answer:[
            {text:"NaAlO2" , correct: false},
            {text:"Al2O3" , correct: false},
            {text:"CaSiO3" , correct: false},
            {text:"H2O" , correct: true},
        ]
    },
     {
        question:"The gas usually filled in the electric bulb is",
        answer:[
            {text:"oxygen" , correct: false},
            {text:"Carbon dioxide" , correct: false},
            {text:"nitrogen" , correct: true},
            {text:"hydrogen" , correct: false},
        ]
    }
];

const ques = document.querySelector("#questions");
const answerButtons = document.querySelector(".answer-buttons");
const nextButton = document.querySelector(".next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex =0;
    score = 0;

    nextButton.innerHTML = "Next";
    showQuestionAndOptions();
}
function reset(){
     nextButton.style.display = "none";
     while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
     }
}

function showQuestionAndOptions(){
    reset();
     let currentQues = quizQuestions[currentQuestionIndex];
     let questionNo = currentQuestionIndex + 1;
     ques.innerHTML = `${questionNo}. ${currentQues.question}`;
     
     currentQues.answer.forEach(item=>{
         const btns = document.createElement("button");
         btns.innerHTML = item.text;
         btns.classList.add("btn");
         answerButtons.append(btns);
         if(item.correct){
            btns.dataset.correct = item.correct;
         }
         btns.addEventListener("click",selectAns);
     })
}


function selectAns(e){
    let selectbtn = e.target;
    let correctbtn = selectbtn.dataset.correct === "true";

    if(correctbtn){
         selectbtn.classList.add("correct");
         score++
    }
    else{
        selectbtn.classList.add("incorrect");
    }

    Array.from(answerButtons.children).forEach(button=>{
         if(button.dataset.correct === "true"){
             button.classList.add("correct");
         }
         button.disabled = true;
    });
    nextButton.style.display = "block"
}
function showScore(){
     reset();
     ques.innerHTML = `Your Score ${score} Out Of ${currentQuestionIndex}!`;
}

function handleQuestions(){
    currentQuestionIndex++
     if(currentQuestionIndex < quizQuestions.length){
         showQuestionAndOptions();
     }
     else{
        showScore();
     }
}

nextButton.addEventListener("click",()=>{
     if(currentQuestionIndex < quizQuestions.length){
         handleQuestions();
     }
     else{
        startQuiz();
     }
})