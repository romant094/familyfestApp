let currentQuestion;

const questionsCount = 20,
    d = document,
    progressWrap = d.querySelector('.test__progress'),
    progressBar = d.querySelector('#progress'),
    testBlocks = d.querySelectorAll('.test__block'),
    buttons = d.querySelectorAll('button'),
    currentQuestionBlock = d.querySelector('#current-question');

const currentPercent = () => {
    progressBar.style.width = (currentQuestion / questionsCount) * 100 + '%';
};

buttons.forEach(function (btn, index) {
    btn.addEventListener('click', function () {
        currentQuestion = +this.dataset.question;

        if (index === 0) {
            progressWrap.classList.remove('disabled');
        }

        currentQuestionBlock.textContent = currentQuestion + 1;
        currentPercent();

        testBlocks[currentQuestion].classList.add('disabled');
        testBlocks[currentQuestion + 1].classList.remove('disabled');

    })
});
