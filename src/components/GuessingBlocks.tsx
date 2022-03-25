import React from 'react';

interface Props {
  sentence: string[][]
}
const GuessingBlocks = ({sentence}: Props) => {
  console.log("guessingblocks sentence: ", sentence);

  if (sentence && sentence.length) {
    const handleGuess = (e: React.ChangeEvent<HTMLInputElement>): void => {
      
    }

    return (
      <div>
        {
          sentence.map((nestedArr: string[], wordInd: number) => {
            console.log("nestedArr: ", nestedArr);
            console.log("wordInd: ", wordInd);
            return (
              <div className="row" key={wordInd + 1}>
                {
                  nestedArr.map((char: string, charInd: number) => {
                    return (
                      <input 
                        className="col text-center m-2" type="text" name="guess" autoComplete="off" 
                        onChange={handleGuess} key={charInd + 1} maxLength={1}
                      />
                    );
                  })
                }
                {
                  wordInd < sentence.length - 1 ? 
                    <input
                      className="col text-center m-2 bg-warning" type="text" name="space" autoComplete="off" 
                      onChange={handleGuess} maxLength={1} 
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
  return null;
}

export default GuessingBlocks;
