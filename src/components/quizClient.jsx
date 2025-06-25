"use client";
import { useState } from "react";

export default function QuizClient({ results }) {
    const [current, setCurrent] = useState(0);

    if (!results || results.length === 0) return <div>No questions found.</div>;

    const result = results[current];

    return (
        <div className="border-2 border-text-white w-96 h-120 p-4 rounded-3xl flex flex-col m-auto mt-40">
            <h2>{result.question}</h2>
            <ul>
                {result.allAnswers.map((answer, idx) => (
                    <li key={idx}>{answer}</li>
                ))}
            </ul>
            <button
                type="button"
                className="uppercase text-text-white border-2 rounded-full py-2"
                onClick={() => setCurrent((prev) => prev + 1)}
                disabled={current >= results.length - 1}
            >
                next
            </button>
        </div>
    );
}