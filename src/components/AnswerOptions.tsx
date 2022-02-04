import React, { useEffect, useMemo, useState } from "react";
import { useAppContext } from "../context/AppContext";

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
  const { appState: { score }, increaseScore, decreaseScore } = useAppContext();
  const [answerState, setAnswerState] = useState<AnswerState>();
  const [selectedOption, setSelectedOption] = useState('');

  const generateAnswers = () => {
    const answerOptions: string[] = [];
    const correctAnswerIndex = Math.floor(Math.random() * 3);
    let count = 0;

    while (count <= 3) {
      const randomAnswerFromListOfAllAnswers = allAnswers[Math.floor(Math.random() * allAnswers.length)];

      if (randomAnswerFromListOfAllAnswers === correctAnswer) continue;

      if (!answerOptions.find((answerOption) => answerOption === randomAnswerFromListOfAllAnswers)) {
        answerOptions.push(randomAnswerFromListOfAllAnswers);
        count++;
      }
    }

    answerOptions[correctAnswerIndex] = correctAnswer;

    return answerOptions;
  };

  const options = useMemo(() => generateAnswers(), [correctAnswer]);

  const handleAnswerSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (selectedOption === correctAnswer) {
      setAnswerState("right");
      increaseScore();
    } else {
      setAnswerState("wrong");
      decreaseScore();
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
        <div className="w-full flex flex-col space-y-4 items-center justify-center mt-4">
          <p className="font-bold text-xl">Current score: {score}</p>
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
