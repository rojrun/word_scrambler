import React, {useRef, useEffect, useState} from 'react';

interface Props {
  sentence: string[][];
  setScore: Function;
  score: number;
}

// Render blocks based on shape of Sentence array
const GuessingBlocks = ({sentence = [], setScore, score}: Props) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [correct, setCorrect] = useState<number>(0);
  const [totalInputs, setTotalInputs] = useState<number>(0);
  
  
  
  useEffect(() => {
    // if (inputRef.current !== null) {
    //   console.log("inputRef: ", inputRef.current);
    //   (inputRef.current.firstChild?.firstChild as HTMLElement)?.focus();     
      
    // }
    countTotalInputs();
  }, [sentence, correct]);

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
      <div ref={inputRef}>
        {
          sentence.map((nestedArr: string[], wordInd: number) => {
            return (
              <div className="row" key={wordInd + 1}>
                {
                  nestedArr.map((char: string, charInd: number) => {
                    let bgColor = "";
                    if (char === " ") {
                      bgColor = "bg-warning";
                    }
                  
                    return (
                      <input
                        className={`col text-center m-1 px-1 ${bgColor}`} type="text" id="guess" autoComplete="off"
                        onChange={(e) => handleGuess(e, wordInd, charInd)} key={charInd + 1} maxLength={1}
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
