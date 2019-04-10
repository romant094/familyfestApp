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
const lastIndex = buttonsNext.length - 1;
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

let answers = [];

const collectAnswers = () => {
    testBlocks.forEach((item, key) => {
        if (key === 0) {
            return
        }
        const inputs = item.querySelectorAll('input');

        inputs.forEach((input) => {
            answers[key - 1] = {
                id: key,
                answers: []
            };
            let isAnswer = false;
            input.addEventListener('change', function () {
                if (this.getAttribute('type') === 'radio') {
                    answers[key - 1].answers[0] = {
                        value: this.value,
                        isCorrect: this.dataset.correct ? this.dataset.correct : null
                    };
                    isAnswer = true;
                    if (key === 1 && answers[key - 1].answers[0].value === '2') {
                        setButtonQuestionNumber(buttonsNext[0],4);
                        setButtonQuestionNumber(buttonsPrev[3],1);
                    } else {
                        setButtonQuestionNumber(buttonsNext[0],2);
                        setButtonQuestionNumber(buttonsPrev[3],3);
                    }
                } else {
                    answers[key - 1].answers = [];
                    inputs.forEach((inp) => {
                        answers[key - 1].answers.push({
                            value: inp.value,
                            isChecked: inp.checked,
                            isCorrect: inp.dataset.correct ? inp.dataset.correct : null
                        });
                    });
                    isAnswer = anyCheckboxIsChecked(inputs);
                }
                console.log(answers[key - 1]);
                buttonsNext[key - 1].disabled = !isAnswer;
            });
        });
    });
};

collectAnswers();

const anyCheckboxIsChecked = (inputs) => {
    let isChecked = false;
    for (let i = 0, length = inputs.length; i < length; i++) {
        if (inputs[i].checked) {
            isChecked = true;
            break;
        }
    }
    return isChecked;
};

const setButtonQuestionNumber = (elem, value) => {
    elem.setAttribute('data-question', value);
};