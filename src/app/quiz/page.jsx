export default async function QuizPage({ params }) {

    const {amount, category, difficulty, type} = params
    /* const amount = params?.amount
    const category = params?.category
    const difficulty = params?.difficulty
    const type = params?.type */

    const url = `https://opentdb.com/api.php?amount=${amount}&category=${category}&difficulty=${difficulty}&type=${type}`;
    const response = await fetch(url, { cache: 'no-store' });
    const data = await response.json();

    function shuffle(array) {
        return array.sort(() => Math.random() - 0.5);
    }

    return (
        <div className="border-2 border-text-white w-96 h-120 p-4 rounded-3xl flex flex-col m-auto mt-40">
            {data.results?.map((result, index) => {
                const allAnswers = shuffle([result.correct_answer, ...result.incorrect_answers]);
                return (
                    <div key={index}>
                        <h2>{result.question}</h2>
                        <ul>
                            {allAnswers.map((answer, idx) => (
                                <li key={idx}>{answer}</li>
                            ))}
                        </ul>
                    </div>
                );
            })}
            <button type='submit' className='uppercase text-text-white border-2 rounded-full py-2 '>next</button>
        </div>
    );
}