import QuizClient from "../../components/quizClient";

function shuffle(array) {
    return array
        .map(value => ({ value, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ value }) => value);
}

export default async function QuizPage({ searchParams }) {
    const waitParams = await searchParams;
    const { amount, category, difficulty, type } = waitParams;

    const url = `https://opentdb.com/api.php?amount=${amount}&category=${category}&difficulty=${difficulty}&type=${type}`;
    const response = await fetch(url);
    const data = await response.json();

    const resultsWithShuffledAnswers = data.results.map(question => ({
        ...question,
        allAnswers: shuffle([question.correct_answer, ...question.incorrect_answers])
    }));

    return <QuizClient results={resultsWithShuffledAnswers} />;
}