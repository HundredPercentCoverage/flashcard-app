import React, { useEffect, useMemo, useState } from 'react';

interface Props {
  correctAnswer: string;
  allAnswers: string[];
  progressToNext: () => void;
}

type AnswerState = null | 'right' | 'wrong';

export function AnswerOptions({ correctAnswer, allAnswers, progressToNext }: Props) {
  const [answerState, setAnswerState] = useState<AnswerState>();
  const [selectedOption, setSelectedOption] = useState('');

  const generateAnswers = () => {
    const newAnswers: string[] = [];
    const correctAnswerIndex = Math.floor(Math.random() * 3);
    let count = 0;

    while (count <= 3) {
      const randomAnswer = allAnswers[Math.floor(Math.random() * allAnswers.length)];

      if (!newAnswers.some(answer => answer === randomAnswer && answer !== correctAnswer)) {
        console.log('add')
        newAnswers.push(randomAnswer);
        count++;
      }
    }

    newAnswers[correctAnswerIndex] = correctAnswer;

    return newAnswers;
  }

  const options = useMemo(() => generateAnswers(), [correctAnswer]);

  const handleAnswerSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (selectedOption === correctAnswer) {
      setAnswerState('right');
    } else {
      setAnswerState('wrong');
    }
  }

  useEffect(() => {
    setAnswerState(null);
  }, [correctAnswer, selectedOption]);

  return (
    <>
      <form onSubmit={(e) => handleAnswerSubmit(e)}>
        <fieldset>
          {options?.map(option => (
            <div key={option}>
              <input
                type="radio"
                id={option}
                name="guess"
                value={option}
                onChange={(e) => e.target.checked && setSelectedOption(e.target.value)}
              />
              <label htmlFor={option}>{option}</label>
            </div>
          ))}
        </fieldset>
        <button type="submit">Submit Answer</button>
      </form>
      {answerState === 'wrong' && (
        <p>Wrong, please try again.</p>
      )}
      {answerState === 'right' && (
        <button type="button" onClick={() => progressToNext()}>Correct!</button>
      )}
    </>
  )
}