import React, {useRef, useEffect} from 'react';

interface Props {
  sentence: string[][]
}

const GuessingBlocks = ({sentence = []}: Props) => {

  const handleGuess = (e: React.ChangeEvent<HTMLInputElement>, wordIn: number, charIn: number): void => {
    const guess = e.target.value;
    const element = e.target;
    console.log("element: ", e);
    console.log("char of sentence: ", sentence[wordIn][charIn]);
    if (e.target.value === sentence[wordIn][charIn]) {
      console.log("they match");
      element.className += " bg-success text-white";
      
    }
  }

  const handleSpacebar = (e: React.KeyboardEvent<HTMLInputElement>) => {
    console.log("e: ", e.target);
    if (e.key === " ") {
      // e.target.className.remove("bg-warning")
    }
  }

  return (
    <div>
      {
        sentence.map((nestedArr: string[], wordInd: number) => {
          return (
            <div className="row" key={wordInd + 1}>
              {
                nestedArr.map((char: string, charInd: number) => {
                  return (
                    <input 
                      className="col text-center m-2" type="text" id="guess" autoComplete="off"
                      onChange={(e) => handleGuess(e, wordInd, charInd)} key={charInd + 1} maxLength={1} data-answer={false}
                    />
                  );
                })
              }
              {  
                wordInd < sentence.length - 1 ? 
                  <input
                    className="col text-center m-2 bg-warning" type="text" id="space" autoComplete="off" 
                    onKeyDown={handleSpacebar} maxLength={1} data-answer={false}
                  />
                  : null
              }
            </div>
          );
        })
      }
    </div>
  );
}

export default GuessingBlocks;
