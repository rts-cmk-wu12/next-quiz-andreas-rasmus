
export default async function QuizPage({ searchParams }) {
    const { amount, category, difficulty, type } = searchParams;

    const url = `https://opentdb.com/api.php?amount=${amount}&category=${category}&difficulty=${difficulty}&type=${type}`;
    const response = await fetch(url);
    const data = await response.json();

    if (!data.results || data.results.length === 0) {
        return (
            <div className="text-center mt-10 text-red-500">
                No questions found for your selection.<br />
                Please try a lower amount or different settings.
            </div>
        );
    }

    const resultsWithShuffledAnswers = data.results.map(question => ({
        ...question,
        allAnswers: shuffle([question.correct_answer, ...question.incorrect_answers])
    }));

    return <QuizClient results={resultsWithShuffledAnswers} />;
}





/* export default async function QuizPage({ searchParams }) {
    const waitParams = await searchParams
    const { amount, category, difficulty, type } = waitParams;

    const url = `https://opentdb.com/api.php?amount=${amount}&category=${category}&difficulty=${difficulty}&type=${type}`;
    const response = await fetch(url);
    const data = await response.json();

    console.log(data);
    

    function shuffle(array) {
        return array.sort(() => Math.random() - 0.5);
    }

    return (
        <div>
            {data.results?.map((result, index) => {
                const allAnswers = shuffle([result.correct_answer, ...result.incorrect_answers]);
                return (
                    <div className="border-2 border-text-white w-96 h-120 p-4 rounded-3xl flex flex-col m-auto mt-40" key={index}>
                        <h2>{result.question}</h2>
                        <ul>
                            {allAnswers.map((answer, idx) => (
                                <li key={idx}>{answer}</li>
                            ))}
                        </ul>
                        <button type='submit' className='uppercase text-text-white border-2 rounded-full py-2 '>next</button>
                    </div>
                );
            })}
        </div>
    );
} */