import React, {createRef, useMemo, useRef, useEffect, useState, useCallback} from 'react';

interface Props {
  sentence: string[][];
  score: number;
  setScore: Function;
  counter: number;
  setCounter: Function;
  values: string[][] | undefined;
  setValues: Function;
}

// Render blocks based on shape of Sentence array
const GuessingBlocks = ({sentence = [], score, setScore, counter, setCounter, values, setValues}: Props) => {
  const [cursor, setCursor] = useState([0, 0]);
  const [correct, setCorrect] = useState<number>(0);
  const [totalInputs, setTotalInputs] = useState<number>(0);

  const buttonRef = useRef<HTMLButtonElement>(null);
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
        if (input.classList.contains("bg-space")) {
          input.classList.remove("bg-space");
        }  
        input.classList.add("bg-correct", "text-white");

        setCorrect(correct + 1);     

        setCursor(([_wordIndex, _charIndex]) => 
          _charIndex + 1 < sentence[_wordIndex].length
            ? [_wordIndex, _charIndex + 1]
            : [_wordIndex + 1, 0]    
        );
        
        const newValuesArr = values!.map((_word, _wordIndex) => {
          if (wordIndex === _wordIndex) {
            const newWord = _word.map((_char, _charIndex) => {
              if (charIndex === _charIndex) {
                return char;
              } else {
                return _char;
              }
            });
            return newWord;
          } else {
            return _word;
          }
        });  
        setValues(newValuesArr);
      }
    }  
  }

  const handleOnClick = () => {
    setValues([]);
    document.querySelectorAll('[id=guess]').forEach((element) => {
      const classNames = ["bg-correct", "text-white"];
      if (classNames.some(classNames => element.classList.contains(classNames))) {
        classNames.forEach(item => element.classList.remove(item));
      }
    }); 
    setCorrect(0);
    setTotalInputs(0);
    setCursor([0, 0]);
    setCounter(counter + 1);
  }

  useEffect(() => {
    countTotalInputs();
    correctCallback();
    const [wordIndex, charIndex] = cursor;
    inputRef[wordIndex]?.[charIndex]?.current.focus();
    buttonRef.current?.focus();
  }, [sentence, totalInputs, cursor, inputRef]);
  
  return (
    <div id="blocks_and_button">
      <div id="blocks">
        { 
          sentence.map((nestedArr: string[], wordIndex: number) => {
            return (
              <div key={wordIndex} className="row">
                {
                  nestedArr.map((char: string, charIndex: number) => {
                    return (
                      <input
                        key={charIndex} 
                        type="text" id="guess" autoComplete="off"
                        className={`col text-center m-1 px-0 ${(/\s/).test(char) ? "bg-space" : ""}`}
                        onChange={(e) => handleGuess(e.target.value, wordIndex, charIndex)}
                        maxLength={1}
                        ref={inputRef[wordIndex][charIndex]}
                        value={
                          values && values.length 
                          ? values[wordIndex][charIndex]
                          : []
                        } 
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
        correct === totalInputs 
          ? <button 
              type="button" 
              className="btn button-next text-white px-4 m-3" 
              ref={buttonRef}
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
