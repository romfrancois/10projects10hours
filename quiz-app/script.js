const quizData = [
    {
        question: 'question 1',
        a: 'answer1',
        b: 'answer2',
        c: 'answer3',
        d: 'answer4',
        correct: 'a'
    },
    {
        question: 'question 2',
        a: 'answer1',
        b: 'answer2',
        c: 'answer3',
        d: 'answer4',
        correct: 'b'
    },
    {
        question: 'question 3',
        a: 'answer1',
        b: 'answer2',
        c: 'answer3',
        d: 'answer4',
        correct: 'c'
    },
    {
        question: 'question 4',
        a: 'answer1',
        b: 'answer2',
        c: 'answer3',
        d: 'answer4',
        correct: 'd'
    },
    {
        question: 'question 5',
        a: 'answer1',
        b: 'answer2',
        c: 'answer3',
        d: 'answer4',
        correct: 'a'
    }
];

const question = document.getElementById('question');
const a_text = document.getElementById('a_text');
const b_text = document.getElementById('b_text');
const c_text = document.getElementById('c_text');
const d_text = document.getElementById('d_text');

const submitBtn = document.getElementById('submit');

let currentQuestion = 0;
let score = 0;

function loadQuestion() {
    const currentQuestionData = quizData[currentQuestion];

    question.innerText = currentQuestionData.question;
    a_text.innerText = currentQuestionData.a;
    b_text.innerText = currentQuestionData.b;
    c_text.innerText = currentQuestionData.c;
    d_text.innerText = currentQuestionData.d;
}

loadQuestion();

submitBtn.addEventListener('click', () => {
    const currentQuestionData = quizData[currentQuestion];
    const answer = currentQuestionData.correct;
    
    const selectedItem = document.querySelector('input[name="answer"]:checked');

    if (selectedItem.id.indexOf(answer) === 0) {
        score++;
    }

    if (currentQuestion < quizData.length -1) {
        currentQuestion++;
     } else {
        console.log('Your score is: ', score);
        quiz.innerHTML = `<h2>You answered correctly at ${score}/${quizData.length} questions.</h2>`;

        currentQuestion = 0;
        score = 0;
    };

    selectedItem.checked = false;
    loadQuestion();
});