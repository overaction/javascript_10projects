'use strict';
const quizData = [
    {
        question: 'How old?',
        a: '10',
        b: '17',
        c: '21',
        d: '102',
        correct: 'c'
    }, {
        question: 'How old?',
        a: '10',
        b: '17',
        c: '21124124',
        d: '102',
        correct: 'c'
    }
];

const answers = document.querySelectorAll('.answer');
const questionEl = document.getElementById('question');
const quiz = document.querySelector('.quiz-container')
const a_text = document.getElementById('a_text');
const b_text = document.getElementById('b_text');
const c_text = document.getElementById('c_text');
const d_text = document.getElementById('d_text');
const submitBtn = document.getElementById('submit');

let currentQuiz = 0;
let score = 0;

function getSelected() {
    let answer = undefined;

    answers.forEach((ans) => {
        if(ans.checked) {
            answer = ans.id;
        }
    })
    return answer;
}

function deselectAnswer() {
    answers.forEach((ans) => {
        ans.checked = false;
    });
}

function loadQuiz() {
    deselectAnswer();
    const currentQuizData = quizData[currentQuiz];
    questionEl.innerText = currentQuizData.question;
    a_text.innerText = currentQuizData.a;
    b_text.innerText = currentQuizData.b;
    c_text.innerText = currentQuizData.c;
    d_text.innerText = currentQuizData.d;
}

loadQuiz();

submitBtn.addEventListener('click',() => {
    const answer = getSelected();
    if(answer && answer === quizData[currentQuiz].correct) {
        score++;
        console.log(currentQuiz);
    }
    if(currentQuiz < quizData.length -1) {
        currentQuiz++;
        loadQuiz();
    }
    else {
        quiz.innerHTML = 
        `<h2>You answered correctly at ${score}/${quizData.length} questions.</h2> 
        <button onClick="location.reload()">Reload</button>`;
    }
})