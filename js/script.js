let currentQuestion = 0;

const questionsCount = 20,
    d = document,
    progressWrap = d.querySelector('.test__progress'),
    progressBar = d.querySelector('#progress'),
    testBlocks = d.querySelectorAll('.test__block'),
    buttonStart = d.querySelector('button.start'),
    buttonsPrev = d.querySelectorAll('button.prev'),
    buttonsNext = d.querySelectorAll('button.next'),
    currentQuestionBlock = d.querySelector('#current-question');

buttonsPrev[0].disabled = true;
const lastIndex = buttonsNext.length-1;
buttonsNext[lastIndex].disabled = true;

const currentPercent = () => {
    progressBar.style.width = (currentQuestion / questionsCount) * 100 + '%';
};

buttonStart.addEventListener('click', function () {
    changeQuestion(this);
    progressWrap.classList.remove('disabled');
});

buttonsPrev.forEach(function (btn, index) {
    btn.addEventListener('click', function () {
        changeQuestion(this);
    })
});

buttonsNext.forEach(function (btn, index) {
    btn.addEventListener('click', function () {
        changeQuestion(this);
    })
});

const changeQuestion = function (elem) {
    let newQuestion = +elem.dataset.question,
    diff = newQuestion - currentQuestion;

    testBlocks[currentQuestion].classList.add('disabled');
    testBlocks[currentQuestion + diff].classList.remove('disabled');
    currentQuestion = newQuestion;

    currentQuestionBlock.textContent = currentQuestion;
    currentPercent();
};
