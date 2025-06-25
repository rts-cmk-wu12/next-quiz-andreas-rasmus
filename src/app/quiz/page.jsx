'use client'
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function QuizPage() {
    const searchParams = useSearchParams();
    const [questions, setQuestions] = useState(null);

    // Get params from URL
    const amount = searchParams.get('amount')
    const category = searchParams.get('category')
    const difficulty = searchParams.get('difficulty')
    const type = searchParams.get('type')

    useEffect(() => {
        async function fetchQuestions() {
            const url = `https://opentdb.com/api.php?amount=${amount}&category=${category}&difficulty=${difficulty}&type=${type}`;
            const response = await fetch(url);
            const data = await response.json();
            setQuestions(data);
        }
        fetchQuestions();
    }, [amount, category, difficulty, type]);

    function shuffle(array) {
        return array.sort(() => Math.random() - 0.5);
    }

    return (
        <div className="border-2 border-red-500 w-96 h-120 p-4 rounded-3xl">
            {/* {questions.results.map((result, index) => {
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
            })} */}
        </div>
    );
}