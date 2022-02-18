import { useRef, useState } from "react";
import { AnswerOptions } from "../components/AnswerOptions";
import { useAppContext } from "../context/AppContext";
import randomiseArray from "../utilities/randomiseArray";

interface Definition {
  term: string;
  definition: string;
}

export function Home() {
  const { resetScore } = useAppContext();
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
            let definition = parts[1].replaceAll('"', '');

            // There should only be two parts per row unless the second contains a comma in a quoted string
            if (parts.length > 2) {
              const definitionParts = parts.slice(1);
              definition = definitionParts.reduce((acc, part) => acc + part).replaceAll('"', '');
            }

            defs.push({ term: parts[0], definition });
            answers.push(definition);
          }
        });

        setDefinitions(randomiseArray<Definition>(defs));
        setAllAnswers(answers);
        setFileReadComplete(true);
        resetScore();
      };

      reader.readAsText(fileInputRef.current?.files[0]);
    }
  };

  return (
    <div className="max-w-screen-xl px-3 mx-auto">
      {fileReadComplete && (
        <>
          <p className="pt-2 text-xl">Pick the right definition for...</p>
          <p className="flex items-center justify-center w-full pt-2 pb-8 text-2xl font-semibold text-amber-500">
            {definitions[currentPosition].term}
          </p>
          <AnswerOptions
            correctAnswer={definitions[currentPosition].definition}
            allAnswers={allAnswers}
            progressToNext={() => setCurrentPosition(currentPosition + 1)}
          />
        </>
      )}
      <div className="flex items-center justify-center w-full pb-8 mt-4">
        <button
          type="button"
          className="px-4 py-2 text-lg font-semibold text-white rounded-md bg-amber-500 hover:opacity-75"
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
