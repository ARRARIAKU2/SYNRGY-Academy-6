// quiz
const questions = [
    {
        id: 1,
        label: 'Apa ibu kota provinsi Jawa Barat?',
        options: [
            {
                label: 'Jakarta',
                correct: false,
                score: 0,
            },
            {
                label: 'Semarang',
                correct: false,
                score: 0,
            },
            {
                label: 'Surabaya',
                correct: false,
                score: 0,
            },
            {
                label: 'Bandung',
                correct: true,
                score: 10,
            },
        ],
    },
    {
        id: 2,
        label: 'Sebutan untuk negara Jepang',
        options: [
            {
                label: 'Matahari Terbit',
                correct: true,
                score: 10,
            },
            {
                label: 'Gajah Putih',
                correct: false,
                score: 0,
            },
            {
                label: '1001 Malam',
                correct: false,
                score: 0,
            },
            {
                label: 'Tirai Bambu',
                correct: false,
                score: 0,
            },
        ],
    },
];

const answers = [
    {
        questions: 1,
        answers: 'Bandung', // 10
    },
    {
        questions: 2,
        answers: 'Matahari Terbit', // 10
    },
];


function calculateScore(answers) {
    let score = 0;
    answers.forEach((answer) => {
        const question = questions.find((q) => q.id === answer.questions);
        console.log(question)

        const correctAnswer = question.options.find((o) => o.correct === true);
        console.log(correctAnswer)

        if (answer.answers === correctAnswer.label) {
            score += correctAnswer.score;
        }
    });
    return score;
}

const score = calculateScore(answers);
console.log(score);