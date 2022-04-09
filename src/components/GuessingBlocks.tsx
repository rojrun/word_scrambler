import React, {createRef, useMemo, useRef, useEffect, useState, useCallback} from 'react';

interface Props {
  sentence: string[][];
  score: number;
  setScore: Function;
  counter: number;
  setCounter: Function;
}

// Render blocks based on shape of Sentence array
const GuessingBlocks = ({sentence = [], score, setScore, counter, setCounter}: Props) => {
  // const [values, setValues] = useState<string[][]>([]);
  const [cursor, setCursor] = useState([0, 0]);
  const [correct, setCorrect] = useState<number>(0);
  const [totalInputs, setTotalInputs] = useState<number>(0);

  const inputRef: any = useMemo(
    () => sentence.map((word) => word.map((_) => createRef())),
    [sentence]
  );

  const countTotalInputs = () => {
    let total: number = 0;
    sentence.forEach((array: string[]) => total += array.length);
    setTotalInputs(total);
  }

  const correctCallback = useCallback(() => {
    if (totalInputs !== 0 && correct === totalInputs) {
      setScore(score + 1);
    }
  }, [correct, totalInputs]);
  
  const handleGuess = (char: string, wordIndex: number, charIndex: number) => {
    if (char === sentence[wordIndex][charIndex]) {
      const input = inputRef[wordIndex][charIndex].current;
      if (input !== null) {
        if (input.classList.contains("bg-warning")) {
          input.classList.remove("bg-warning");
          input.className += " bg-success text-white";
        } else {
          input.className += "bg-success text-white";
        }
        
        setCorrect(correct + 1);     

        setCursor(([_wordIndex, _charIndex]) => 
          _charIndex + 1 < sentence[_wordIndex].length
            ? [_wordIndex, _charIndex + 1]
            : [_wordIndex + 1, 0]    
        );
        
        // setValues((values): any => {
        //   values.map((_word, _wordIndex) => {
        //     if (wordIndex !== _wordIndex) return _word;
        //     return _word.map((_char, _charIndex) => {
        //       if (charIndex !== _charIndex) return _char;
        //       return char;
        //     })
        //   })  
        // });
        
      }
    }  
  }

  const handleOnClick = () => {
    setCursor([0, 0]);
    setCorrect(0);
    setTotalInputs(0);
    setCounter(counter + 1);
  }

  useEffect(() => {
    // sentence.map((word: string[]) => {
    //   const newWordArr = word.map(() => "");
    //   setValues(values => [...values, newWordArr]);
    // });
    const [wordIndex, charIndex] = cursor;
    inputRef[wordIndex]?.[charIndex]?.current.focus();
    countTotalInputs();
    correctCallback();   
  }, [sentence, totalInputs, cursor, inputRef]);
  
  return (
    <div>
      <div>
        {
          sentence.map((nestedArr: string[], wordIndex: number) => {
            return (
              <div className="row" key={wordIndex}>
                {
                  nestedArr.map((char: string, charIndex: number) => {
                    let bgColor = "";
                    if (char === " ") {
                      bgColor = "bg-warning";
                    }
                    
                    return (
                      <input
                        type="text" id="guess" autoComplete="off"
                        className={`col text-center m-1 px-1 ${bgColor}`} 
                        onChange={(e) => handleGuess(e.target.value, wordIndex, charIndex)}
                        key={charIndex} 
                        maxLength={1}
                        ref={inputRef[wordIndex][charIndex]}
                        // value={
                        //   values && values.length 
                        //   ? values[wordIndex][charIndex]
                        //   : []
                        // } 
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
          <button 
            type="button" 
            className="btn btn-success px-4 m-3" 
            onClick={handleOnClick}
          >
            Next
          </button>
          : null
      }
    </div>
  );
}

export default GuessingBlocks;
