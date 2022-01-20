import React, { useEffect, useMemo, useState } from "react";

interface Props {
  correctAnswer: string;
  allAnswers: string[];
  progressToNext: () => void;
}

type AnswerState = null | "right" | "wrong";

export function AnswerOptions({
  correctAnswer,
  allAnswers,
  progressToNext,
}: Props) {
  const [answerState, setAnswerState] = useState<AnswerState>();
  const [selectedOption, setSelectedOption] = useState("");

  const generateAnswers = () => {
    const newAnswers: string[] = [];
    const correctAnswerIndex = Math.floor(Math.random() * 3);
    let count = 0;

    while (count <= 3) {
      const randomAnswer = allAnswers[Math.floor(Math.random() * allAnswers.length)];

      if (!newAnswers.some((answer) => answer === randomAnswer && answer !== correctAnswer)) {
        newAnswers.push(randomAnswer);
        count++;
      }
    }

    newAnswers[correctAnswerIndex] = correctAnswer;

    return newAnswers;
  };

  const options = useMemo(() => generateAnswers(), [correctAnswer]);

  const handleAnswerSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (selectedOption === correctAnswer) {
      setAnswerState("right");
    } else {
      setAnswerState("wrong");
    }
  };

  useEffect(() => {
    setAnswerState(null);
  }, [correctAnswer, selectedOption]);

  return (
    <>
      <form onSubmit={(e) => handleAnswerSubmit(e)}>
        <fieldset>
          {options?.map((option) => (
            <label key={option} className="pb-2 flex items-center space-x-4">
              <input
                type="radio"
                id={option}
                name="guess"
                value={option}
                onChange={(e) =>
                  e.target.checked && setSelectedOption(e.target.value)
                }
                required
                className="accent-amber-600"
              />
              <div>
                <span>{option}</span>
              </div>
            </label>
          ))}
        </fieldset>
        <div className="w-full flex items-center justify-center mt-4">
          {answerState === "right" && (
            <button
              type="button"
              onClick={() => progressToNext()}
              className="px-4 py-2 bg-green-400 hover:opacity-75 text-white font-semibold rounded-md text-lg"
            >
              Correct! Click to go to the next one
            </button>
          )}
          {answerState === 'wrong' && (
            <button
              type="button"
              className="px-4 py-2 bg-red-500 hover:opacity-75 text-white font-semibold rounded-md text-lg cursor-not-allowed"
              disabled
            >
              Wrong - please try again
            </button>
          )}
          {!answerState && (
            <button
              type="submit"
              className="px-4 py-2 bg-gray-600 hover:opacity-75 text-white font-semibold rounded-md text-lg"
            >
              Submit Answer
            </button>
          )}
        </div>
      </form>
    </>
  );
}
