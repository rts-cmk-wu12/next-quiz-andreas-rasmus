"use client";
import { useState } from "react";

function decodeHtml(html) {
    const txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
}

export default function QuizClient({ results }) {
    const [current, setCurrent] = useState(0);
    const [selected, setSelected] = useState(null);
    const [feedback, setFeedback] = useState("");

    if (!results || results.length === 0) return <div>No questions found.</div>;

    const result = results[current];

    const handleSelect = (answer) => {
        setSelected(answer);
        if (answer === result.correct_answer) {
            setFeedback(
                <span className="text-green-600 font-semibold">
                    Correct! You chose: <span className="underline">{decodeHtml(answer)}</span>
                </span>
            );
        } else {
            setFeedback(
                    <span>
                        Wrong! You chose: 
                        <span className="text-red-600 font-semibold underline">{decodeHtml(answer)}</span>
                        . The correct answer was: 
                        <span className="text-green-600 font-semibold underline">{decodeHtml(result.correct_answer)}</span>
                    </span>
            );
        }
    };

    return (
        <div className="border-2 border-text-white w-100 h-120 p-4 rounded-3xl flex flex-col m-auto mt-40">
            <h2 className="text-2xl">{decodeHtml(result.question)}</h2>
            <ul className="flex flex-col gap-3 mt-10">
                {result.allAnswers.map((answer, idx) => (
                    <li key={idx}>
                        <input
                            type="radio"
                            name="answer"
                            id={`answer-${idx}`}
                            checked={selected === answer}
                            onChange={() => handleSelect(answer)}
                            disabled={selected !== null}
                        />
                        <label
                            htmlFor={`answer-${idx}`}
                            className={
                                selected === answer ? answer === result.correct_answer ? "text-green-500 font-bold" : "text-red-500 font-bold" : ""
                            }>{decodeHtml(answer)}
                        </label>
                    </li>
                ))}
            </ul>
            {selected && (
                <div className="mt-4">
                    {feedback}
                </div>
            )}
            <button
                type="button"
                className="uppercase text-text-white border-2 rounded-full py-2 mt-auto"
                onClick={() => {
                    setCurrent((prev) => prev + 1);
                    setSelected(null);
                    setFeedback("");
                }}
                disabled={current >= results.length - 1}
            >
                next
            </button>
        </div>
    );
}