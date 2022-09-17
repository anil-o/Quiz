let questions = [{
    'question': 'Wie viele Bit hat ein Byte?',
    'answer_1': '2',
    'answer_2': '4',
    'answer_3': '8',
    'answer_4': '16',
    'right_answer': 3,
    'correct_answer': 'answer_3'
},
{
    'question': 'Was bedeutet "Open-Source?',
    'answer_1': 'Der Quellcode ist öffentlich zugänglich und veränderbar',
    'answer_2': 'Der Quellcode ist nicht öffentlich zugänglich',
    'answer_3': 'Es handelt sich um eine Peer to Peer Netzwerk',
    'answer_4': 'Es handelt sich um ein privates Netzwerk',
    'right_answer': 1,
    'correct_answer': 'answer_1'
},
{
    'question': 'Was ist ein Trojaner?',
    'answer_1': 'Hardware',
    'answer_2': 'Software',
    'answer_3': 'Virus',
    'answer_4': 'Programmiersprache',
    'right_answer': 3,
    'correct_answer': 'answer_3'
},
{
    'question': 'Wer hat Javascript entwickelt?',
    'answer_1': 'Brendan Eich',
    'answer_2': 'Jeff Bezos',
    'answer_3': 'Bill Gates',
    'answer_4': 'Steve Jobs',
    'right_answer': 1,
    'correct_answer': 'answer_1'
},
{
    'question': 'Wofür steht die Abkürzung WWW?',
    'answer_1': 'Wide Web World',
    'answer_2': 'World Wide Web',
    'answer_3': 'World Web Wid',
    'answer_4': 'Web Wide World',
    'right_answer': 2,
    'correct_answer': 'answer_2'
},
{
    'question': 'Wer hat HTML entwickelt?',
    'answer_1': 'Jeff Bezos',
    'answer_2': 'Larry Page',
    'answer_3': 'Sergey Brin',
    'answer_4': 'Tim Berners-Lee',
    'right_answer': 4,
    'correct_answer': 'answer_4'
},
];

let currentQuestion = 0;
let numberOfTheCurrentQuestion = 1;
let scoreFinal = 0;
let AUDIO_SUCCESS = new Audio('audio/success.mp3');
let AUDIO_WRONG = new Audio('audio/wrong.mp3');

/*
    *onloading initialization
*/

function init() {
    document.getElementById('questiontotal').innerHTML = questions.length;
    document.getElementById('currentQuestionNumber').innerHTML = numberOfTheCurrentQuestion;

    showQuestion();
}

/*
    *start Quiz
*/

function startQuiz() {
    document.getElementById('startscreen').classList.add('hide');
    document.getElementById('startquiz').classList.remove('hide');
}

/*
    *shwowing questions
*/

function showQuestion() {
    if (gameIsOver()) {
        showEndscreen();
    } else {
        updateProgessBar();
        updateToNextQuestion();
    }
}

/*
    *condition for game is over
*/

function gameIsOver() { //function gives always either true or false
    return numberOfTheCurrentQuestion > questions.length
}

/*
    *show next Question
*/

function updateToNextQuestion() {

    let question = questions[currentQuestion];

    document.getElementById('questionstext').innerHTML = question['question'];
    document.getElementById('answer_1').innerHTML = question['answer_1'];
    document.getElementById('answer_2').innerHTML = question['answer_2'];
    document.getElementById('answer_3').innerHTML = question['answer_3'];
    document.getElementById('answer_4').innerHTML = question['answer_4'];
}

/*
    *show endscreen
*/

function showEndscreen() {
    document.getElementById('endscreen').classList.remove('hide');
    document.getElementById('endscreen').classList.add('text-center');
    document.getElementById('questionbody').classList.add('hide');
    document.getElementById('restart-button').classList.remove('hide');
    document.getElementById('restart-button').classList.add('restartbuttoncontainer');

    document.getElementById('img-question').src = 'img/questions.png';


    document.getElementById('points').classList.remove('hide');
    document.getElementById('question-all').innerHTML = questions.length;
    document.getElementById('score').innerHTML = scoreFinal;
    calculationScoreForImage();
}

/*
    *update Progessbar
*/

function updateProgessBar() {
    let percent = Math.round(((currentQuestion + 1) / questions.length) * 100);
    console.log(percent);

    document.getElementById('progess').style = `width: ${percent}%;`;
}

/*
    *action if answer is right or wrong
*/

function answer(selection) {
    let question = questions[currentQuestion];
    let selectedQuestionNumber = selection.slice(-1);
    if (rightAnswerSelected(selectedQuestionNumber, question)) {
        let rightAnswer = document.getElementById(selection);
        rightAnswer.parentNode.classList.add('bg-success');
        AUDIO_SUCCESS.play();
        scoreFinal++;

        document.getElementById('score').innerHTML = score;
    } else {
        let rightAnswer = document.getElementById(selection);
        rightAnswer.parentNode.classList.add('bg-danger');
        AUDIO_WRONG.play();

        let correctAnswer = document.getElementById(question['correct_answer']);
        correctAnswer.parentNode.classList.add('bg-success');
    }
    document.getElementById('next-button').disabled = false;
}

/*
    *right answer selected
*/

function rightAnswerSelected(selectedQuestionNumber, question) {
    return selectedQuestionNumber == question['right_answer'];
}

/*
    *show next question
*/


function nextQuestion() {
    if (numberOfTheCurrentQuestion <= questions.length) {
        numberOfTheCurrentQuestion++
    }
    currentQuestion++;
    templateNextQuestion();
    showQuestion();
}

function templateNextQuestion() {
    document.getElementById('next-button').disabled = true;

    document.getElementById('answer_1').parentNode.classList.remove('bg-danger');
    document.getElementById('answer_1').parentNode.classList.remove('bg-success');

    document.getElementById('answer_2').parentNode.classList.remove('bg-danger');
    document.getElementById('answer_2').parentNode.classList.remove('bg-success');

    document.getElementById('answer_3').parentNode.classList.remove('bg-danger');
    document.getElementById('answer_3').parentNode.classList.remove('bg-success');

    document.getElementById('answer_4').parentNode.classList.remove('bg-danger');
    document.getElementById('answer_4').parentNode.classList.remove('bg-success');

    document.getElementById('currentQuestionNumber').innerHTML = numberOfTheCurrentQuestion;
}

/*
    * calculation final score to change img endscreen
*/

function calculationScoreForImage() {
    if (scoreFinal == questions.length) {
        document.getElementById('img-question').src = 'img/trophy.jpg';
    }
}

/*
    *start Quiz again
*/

function restartQuiz() {
    document.getElementById('img-question').src = 'img/quiz.png';
    currentQuestion = 0;
    numberOfTheCurrentQuestion = 1;
    scoreFinal = 0;

    hideEndscreen();
    showStart(); 
    init();
}

/*
    *hide endscreen
*/

function hideEndscreen() {
    document.getElementById('endscreen').classList.add('hide');
    document.getElementById('points').classList.add('hide');
    document.getElementById('restart-button').classList.add('hide');
    document.getElementById('restart-button').classList.remove('restartbuttoncontainer');
}

/*
    *show startscreen
*/

function showStart() {
    document.getElementById('questionbody').classList.remove('hide');
}