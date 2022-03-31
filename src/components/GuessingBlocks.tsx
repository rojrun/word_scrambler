import React, {createRef, useMemo, useRef, useEffect, useState} from 'react';

interface Props {
  sentence: string[][];
  setScore: Function;
  score: number;
}

// Render blocks based on shape of Sentence array
const GuessingBlocks = ({sentence = [], setScore, score}: Props) => {
  const [cursor, setCursor] = useState([0, 0]);
  // const inputRef = useRef<HTMLInputElement>(null);
  const inputRef:any = useMemo(
    () => sentence.map((word) => word.map((_) => createRef())),
    [sentence]
  );
  const [values, setValues] = useState(sentence.map((word) => word.map(() => "")));
  const [correct, setCorrect] = useState<number>(0);
  const [totalInputs, setTotalInputs] = useState<number>(0);
  
  
  
  useEffect(() => {
    // if (inputRef.current !== null) {
    //   console.log("inputRef: ", inputRef.current);
    //   (inputRef.current.firstChild?.firstChild as HTMLElement)?.focus();     
      
    // }
    const [wordInd, charInd] = cursor;
    inputRef[wordInd]?.[charInd]?.current.focus();
    countTotalInputs();
  }, [sentence, correct, cursor]);

  const countTotalInputs = () => {
    let total: number = 0;
    sentence.forEach((array: string[]) => total += array.length);
    setTotalInputs(total);
  }

  const handleGuess = (e: React.ChangeEvent<HTMLInputElement>, wordIn: number, charIn: number): void => {
    const guess = e.target.value;
    const element = e.target;
    if (guess === sentence[wordIn][charIn]) {
      if (element.classList.contains("bg-warning")) {
        element.classList.remove("bg-warning");
        element.className += " bg-success text-white";
      } else {
        element.className += "bg-success text-white";
      }
      setCorrect(correct + 1);
      (element.nextElementSibling as HTMLElement)?.focus();
      
      if (correct === totalInputs) {
        setScore(score + 1);
      }
    } 
  }

  return (
    <div>
      <div>
        {
          sentence.map((nestedArr: string[], wordInd: number) => {
            return (
              <div className="row" key={wordInd}>
                {
                  nestedArr.map((char: string, charInd: number) => {
                    let bgColor = "";
                    if (char === " ") {
                      bgColor = "bg-warning";
                    }
                  
                    return (
                      <input
                        className={`col text-center m-1 px-1 ${bgColor}`} type="text" id="guess" autoComplete="off"
                        onChange={(e) => handleGuess(e, wordInd, charInd)} key={charInd} maxLength={1} ref={inputRef[wordInd][charInd]}
                      />
                    );
                  })
                }
              </div>
            );
          })      
        }
      </div>
      {
        correct === totalInputs ? 
          <button type="button" className="btn btn-success px-4 m-3">Next</button>
          : null
      }
    </div>
  );
}

export default GuessingBlocks;
