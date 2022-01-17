import { useEffect, useMemo, useRef, useState } from "react";
import { AnswerOptions } from "../components/AnswerOptions";

interface Definition {
  term: string;
  definition: string;
}

export function Home() {
  const fileRef = useRef<HTMLInputElement>(null);
  const [definitions, setDefinitions] = useState<Definition[]>([]);
  const [allAnswers, setAllAnswers] = useState<string[]>([]);
  const [currentPosition, setCurrentPosition] = useState(0);
  const [potentialAnswers, setPotentialAnswers] = useState<string[]>([]);
  const [fileReadComplete, setFileReadComplete] = useState(false);

  const handleFileChange = () => {
    if (fileRef.current?.files) {
      const reader = new FileReader();
  
      reader.onload = (e) => {
        const content = reader.result;
        const lines = content?.toString().split(/\r\n/);

        const defs: Definition[] = [];
        const answers: string[] = [];

        lines?.forEach(line => {
          const parts = line.split(',');

          if (parts[1]) {
            const fixedAnswer = parts[1].replaceAll('"', '');
            defs.push({ term: parts[0], definition: fixedAnswer });
            answers.push(fixedAnswer);
          }
        });

        setDefinitions(defs);
        setAllAnswers(answers);
        setFileReadComplete(true);
      }
  
      reader.readAsText(fileRef.current?.files[0]);
    }
  }

  return (
    <div>
      <input type="file" name="file" id="file" onChange={handleFileChange} ref={fileRef}  />
      {fileReadComplete && (
        <>
          <p>{definitions[currentPosition].term}</p>
          <p>What's the right definition?</p>
          <AnswerOptions
            correctAnswer={definitions[currentPosition].definition}
            allAnswers={allAnswers}
            progressToNext={() => setCurrentPosition(currentPosition + 1)}
          />
        </>
      )}
    </div>
  )
}
