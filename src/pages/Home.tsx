import { useEffect, useMemo, useRef, useState } from "react";
import { AnswerOptions } from "../components/AnswerOptions";

interface Definition {
  term: string;
  definition: string;
}

export function Home() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [definitions, setDefinitions] = useState<Definition[]>([]);
  const [allAnswers, setAllAnswers] = useState<string[]>([]);
  const [currentPosition, setCurrentPosition] = useState(0);
  const [fileReadComplete, setFileReadComplete] = useState(false);

  const handleFileChange = () => {
    if (fileInputRef.current?.files) {
      const reader = new FileReader();

      reader.onload = (e) => {
        const content = reader.result;
        const lines = content?.toString().split(/\r\n/);

        const defs: Definition[] = [];
        const answers: string[] = [];

        lines?.forEach((line) => {
          const parts = line.split(",");

          if (parts[1]) {
            const fixedAnswer = parts[1].replaceAll('"', "");
            defs.push({ term: parts[0], definition: fixedAnswer });
            answers.push(fixedAnswer);
          }
        });

        setDefinitions(defs);
        setAllAnswers(answers);
        setFileReadComplete(true);
      };

      reader.readAsText(fileInputRef.current?.files[0]);
    }
  };

  return (
    <div className="max-w-screen-xl mx-auto px-3">
      {fileReadComplete && (
        <>
          <p className="pt-2 text-xl">Pick the right definition for...</p>
          <p className="pt-2 pb-8 text-2xl font-semibold flex items-center justify-center w-full">
            {definitions[currentPosition].term}
          </p>
          <AnswerOptions
            correctAnswer={definitions[currentPosition].definition}
            allAnswers={allAnswers}
            progressToNext={() => setCurrentPosition(currentPosition + 1)}
          />
        </>
      )}
      <div className="w-full flex items-center justify-center mt-4">
        <button
          type="button"
          className="bg-blue-400 hover:opacity-75 font-semibold px-4 py-2 rounded-md text-white text-lg"
          onClick={() => fileInputRef.current?.click()}
        >
          {allAnswers.length > 0 ? 'Open New File' : 'Open File'}
        </button>
        <input
          type="file"
          name="file"
          id="file"
          onChange={handleFileChange}
          ref={fileInputRef}
          className="hidden"
        />
      </div>
    </div>
  );
}
