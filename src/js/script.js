let currentQuestion = 0,
    correctAnswers = 0,
    answers = [],
    routeNumber;

const questionsCount = 20,
    d = document,
    progressWrap = d.querySelector('.test__progress'),
    progressBar = d.querySelector('#progress'),
    testBlocks = d.querySelectorAll('.test__block'),
    buttonStart = d.querySelector('button.start'),
    buttonEnd = d.querySelector('button.end'),
    // buttonRestart = d.querySelector('button.restart'),
    buttonsPrev = d.querySelectorAll('button.prev, button.next'),
    buttonsNext = d.querySelectorAll('button.next'),
    routeLinks = d.querySelectorAll('.route-link'),
    currentQuestionBlock = d.querySelector('#current-question'),
    resultCorrectAnswers = d.querySelector('#correct-answers'),
    resultFinalText = d.querySelector('#text-end'),
    resultTextWrap = d.querySelector('#result-text-wrap'),
    lastIndex = buttonsNext.length - 1,
    results = {
        good: 'Ого, ваши финансовые знания на достойном уровне, но нет предела совершенству! Предлагаем вам следующий маршрут по площадке Семейного финансового фестиваля!',
        bad: 'Упс. Ваши финансовые знания ниже среднего. Но учиться никогда не поздно! Предлагаем вам следующий маршрут по площадке Семейного финансового фестиваля!'
    },
    locations = [
        {
            id: 1,
            locations: 'Университет, Офис консультантов, Городская площадь, Финансовый центр, Сквер, Выставка плакатов.'
        },
        {
            id: 2,
            locations: 'Клуб «60 секунд», Игровая площадка, Сквер, Беседка, Школа, Финансовый центр, Университет.'
        },
        {
            id: 3,
            locations: {
                children: 'Клуб «60 секунд», Игровая площадка, Сквер, Беседка, Библиотека, Школа.',
                grownUps: 'Университет, Офис консультантов, Городская площадь, Сквер, Выставка плакатов.'
            }
        }
    ],
    routes = [
        {
            id: 1,
            locations: [
                'Университет, Офис консультантов, Городская площадь, Финансовый центр, Сквер, Выставка плакатов.'
            ]
        },
        {
            id: 2,
            locations: [
                'Клуб «60 секунд», Игровая площадка, Сквер, Беседка, Школа, Финансовый центр, Университет.'
            ]
        },
        {
            id: 3,
            locations: [
                'Клуб «60 секунд», Игровая площадка, Сквер, Беседка, Библиотека, Школа.',
                'Университет, Офис консультантов, Городская площадь, Сквер, Выставка плакатов.'
            ]
        }
    ];

buttonsPrev[0].disabled = true;
buttonsNext[lastIndex].disabled = true;

const currentPercent = () => {
    progressBar.style.width = (currentQuestion / questionsCount) * 100 + '%';
};

buttonStart.addEventListener('click', function () {
    changeQuestion(this);
});

buttonEnd.addEventListener('click', function () {
    changeQuestion(this);
    countAnswers();
    renderResults();
});

buttonsPrev.forEach(function (btn) {
    btn.addEventListener('click', function () {
        changeQuestion(this);
    })
});

buttonsNext.forEach(function (btn) {
    btn.addEventListener('click', function () {
        changeQuestion(this);
    })
});

const changeQuestion = function (elem) {
    let newQuestion = +elem.dataset.question,
        diff = newQuestion - currentQuestion,
        progressIsVisible = false;

    if (newQuestion > 0 && newQuestion < 21) {
        progressIsVisible = true;
    }

    progressIsVisible ? progressWrap.classList.remove('disabled') : progressWrap.classList.add('disabled');

    testBlocks[currentQuestion].classList.add('disabled');
    testBlocks[currentQuestion + diff].classList.remove('disabled');
    currentQuestion = newQuestion;

    currentQuestionBlock.textContent = currentQuestion;
    currentPercent();
};


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
                        isChecked: this.checked,
                        isCorrect: this.dataset.correct ? this.dataset.correct : null
                    };
                    isAnswer = true;
                    if (key === 1 && answers[key - 1].answers[0].value === '2') {
                        setButtonQuestionNumber(buttonsNext[0], 4);
                        setButtonQuestionNumber(buttonsPrev[3], 1);
                    } else {
                        setButtonQuestionNumber(buttonsNext[0], 2);
                        setButtonQuestionNumber(buttonsPrev[3], 3);
                    }
                } else {
                    answers[key - 1].answers = [];
                    inputs.forEach((inp) => {
                        answers[key - 1].answers.push({
                            value: inp.value,
                            isChecked: inp.checked,
                            isCorrect: inp.dataset.correct ? true : null
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

/*buttonRestart.addEventListener('click', function () {
    answers = [];
    const inputs = d.querySelectorAll('input');
    inputs.forEach((input) => {
        if (input.checked) {
            input.checked = false;
        }
    });
    buttonsNext.forEach((btn) => {
        btn.disabled = true;
    });
    changeQuestion(this);
});*/

const countAnswers = () => {
    correctAnswers = 0;
    answers.forEach((answer, key) => {
        let checked = 0,
            correct = 0;

        answer.answers.forEach((item) => {
            if (item.isChecked) {
                checked++
            }
            if (item.isCorrect) {
                correct++
            }
        });

        if (checked !== 0 && (checked === correct)) {
            correctAnswers++
        }

        console.log('question number', key);
        console.log('checked', checked);
        console.log('correct', correct);
        console.log('correctAnswers', correctAnswers);

    })
};

const renderResults = () => {
    // correctAnswers = 9;
    let resultText = '';

    if (correctAnswers < 8) {
        resultTextWrap.classList.add('text-danger');
        resultText = results.bad;
    } else {
        resultTextWrap.classList.add('text-success');
        resultText = results.good;
    }
    resultCorrectAnswers.textContent = correctAnswers;
    resultFinalText.textContent = resultText;

    const firstAnswer = answers[0].answers[0],
        secondAnswer = answers[1].answers[0];

    if (firstAnswer.value === '2') {
        renderRoutes(routeLinks[0], 1);
    }
    if (firstAnswer.value === '1' && secondAnswer.value === '1') {
        renderRoutes(routeLinks[0], 2);
    }
    if (firstAnswer.value === '1' && secondAnswer.value === '2') {
        renderRoutes(routeLinks[0], 3);
    }
    if (firstAnswer.value === '1' && secondAnswer.value === '3') {
        renderRoutes(routeLinks[0], 2);
        renderRoutes(routeLinks[1], 3);
    }
};

const renderRoutes = (routeLink, routeNum) => {
    routeLink.setAttribute('href', 'route' + routeNum);
    if (routeLink.querySelector('span')){
        routeLink.querySelector('span').textContent = routeNum;
    }
    console.log(routeLink);
    if (routeLink === routeLinks[1]){
        routeLink.classList.remove('disabled');
    }
};

const shareOkFunction = ()=>{
    fetch('https://connect.ok.ru/oauth/authorize\n' +
        '\n' +
        '?client_id=1277911296\n' +
        '\n' +
        '&scope=VALUABLE_ACCESS;LONG_ACCESS_TOKEN\n' +
        '\n' +
        '&response_type=token\n' +
        '\n' +
        '&redirect_uri=https://apiok.ru/oauth_callback')
        .then(()=>{
            fetch('https://api.ok.ru/fb.do\n' +
                '\n' +
                '?application_key=CBACGMCNEBABABABA\n' +
                '\n' +
                '&format=json\n' +
                '\n' +
                '&method=share.fetchLinkV2\n' +
                '\n' +
                '&url=https%3A%2F%2Fasque.me\n' +
                '\n' +
                '&sig=a6e5bd7a88e76113f422ed0473250c5d\n' +
                '\n' +
                '&access_token=-s-9.gfKHPeka5JGIw7By8gDtL7eYCnIKSfEaiFINMah07FIKthhW7mMMtcd4-irRL9f.hEJuwffz7HKMSceZghI-y1');
        })
        .catch(res=>console.log(res));
};

const shareOkBtn = d.querySelector('#ok-share');

shareOkBtn.addEventListener('click', ()=>{
    shareOkFunction();
});

const devFunc = () => {
    const allQ = d.querySelector('.all-questions');

    for (let i = 0; i < 22; i++) {
        const elem = d.createElement('SPAN');
        elem.textContent = i + 1;
        elem.style.padding = 10 + 'px';
        elem.style.cursor = 'pointer';
        elem.setAttribute('data-question', i + 1);
        allQ.appendChild(elem);
    }
    d.querySelectorAll('.all-questions span').forEach((item) => {
        item.style.fontWeight = '400';

        item.addEventListener('click', function () {
            if (currentQuestion === +item.dataset.question) {
                item.style.fontWeight = '700';
            }
            changeQuestion(this);
        })
    })
};
// devFunc();