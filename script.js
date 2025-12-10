const questions=[
    {
        question:"Which is the largest animal in the World?",
        answers:[
            {text:"Shark",correct:false},
            {text:"Blue whale",correct:true},
            {text:"Elephant",correct:false},
            {text:"Giraffe",correct:false}
        ]
    },
    {
        question:"Which is the  Smallest country in the World?",
        answers:[
            {text:"Vatican city",correct:true},
            {text:"Bhutan",correct:false},
            {text:"Nepal",correct:false},
            {text:"Sri lanka",correct:false}
        ]
    },
    {
        question:"Which is the largest desert in the World?",
        answers:[
            {text:"Kalahari",correct:false},
            {text:"Gobi",correct:true},
            {text:"Sahara",correct:true},
            {text:"Antartica",correct:false}
        ]
    },
    {
        question:"Which is the  Smallest continent in the World?",
        answers:[
            {text:"Asia",correct:false},
            {text:"Australia",correct:true},
            {text:"Africa",correct:false},
            {text:"America",correct:false}
        ]
    }
];

const questionElement=document.getElementById("question");
const answerbutton=document.getElementById("answer-buttons");
const nextbutton=document.getElementById("next-btn");

let currentQuestionIndex=0;
let score=0;

function startQuiz()
{
    currentQuestionIndex=0;
    score=0;
    nextbutton.innerHTML="Next";
    showQuestion();

}

function showQuestion()
{
    resetState();
    let currentQuestion=questions[currentQuestionIndex];
    let questionNo=currentQuestionIndex+1;
    questionElement.innerHTML=questionNo+". "+currentQuestion.question;

    // clear previous answers
    answerbutton.innerHTML = "";

    currentQuestion.answers.forEach(answer=>
    {
        const button=document.createElement("button");
        button.innerHTML=answer.text;
        button.classList.add("btn");
        answerbutton.appendChild(button);
        if(answer.correct)
            {
                button.dataset.correct=answer.correct;
            }
        button.addEventListener("click",selectAnswer);
    }
    );
}


function resetState()
{
    nextbutton.style.display="none";
    while(answerbutton.firstChild)
    {
        answerbutton.removeChild(answerbutton.firstChild)
    }
}


function selectAnswer(e)
{
    const selectedBtn=e.target;
    const isCorrect=selectedBtn.dataset.correct==="true";
    if(isCorrect)
    {
        selectedBtn.classList.add("correct");
        score++;
    }
    else{
        selectedBtn.classList.add("incorrect");
    }
     Array.from(answerbutton.children).forEach(button=>
     {
        if(button.dataset.correct==="true")
        {

            button.classList.add("correct");
        }
        button.disabled=true;
     }
     )
    nextbutton.style.display = "block";
}

function showscore()
{
    resetState();
    questionElement.innerHTML=`You scores ${score} out of ${questions.length}!`
    nextbutton.innerHTML="Play Again";
    nextbutton.style.display='block';
}

function handleNextButton()
{
    currentQuestionIndex++;

    if(currentQuestionIndex<questions.length)
    {
        showQuestion();
    }
    else{
        showscore();
    }
}
nextbutton.addEventListener("click",()=>
{
    if(currentQuestionIndex<questions.length)
    {

        handleNextButton();
    }
    else{
        startQuiz();
    }
})
startQuiz();
