import React, {useState, useEffect} from 'react';

interface Props {
  sentence: string[][];
  counter: number;
}

const Sentence = ({sentence = [], counter}: Props) => {
  const [scrambledSentence, setScrambledSentence] = useState<string>("");
  
  useEffect(() => {
    scramble();
  }, [sentence]);
  
  // Loop through array, randomize each nested string array, rejoin each word to form scrambled sentence
  const scramble = (): void => {
    let scrambleSentenceArr = sentence.map((nestedArr: string[]): string => {
      if (nestedArr.length <= 2) {
        const arrToStr = nestedArr.join("");
        return arrToStr;

      } else {
        let nestedArrCopy: string[] = [...nestedArr];
        nestedArrCopy.splice(0, 1);
        
        if (nestedArrCopy[nestedArrCopy.length - 1] === " ") {
          nestedArrCopy.splice(-2, 2);
        } else {
          nestedArrCopy.splice(-1, 1);
        }
        
        if (nestedArrCopy.length === 1) {
          nestedArrCopy = nestedArrCopy;
        } else if (nestedArrCopy.length === 2) {
          const temp: string = nestedArrCopy[1];
          nestedArrCopy[1] = nestedArrCopy[0];
          nestedArrCopy[0] = temp;
        } else {
          nestedArrCopy = nestedArrCopy.sort(() => Math.random() - 0.5);
        }
  
        nestedArrCopy.unshift(nestedArr[0]);
        if (nestedArr[nestedArr.length - 1] === " ") {
          nestedArrCopy.push(nestedArr[nestedArr.length - 2], nestedArr[nestedArr.length - 1]);
        } else {
          nestedArrCopy.push(nestedArr[nestedArr.length - 1]);
        }
        
        const rejoinWord: string = nestedArrCopy.join("");
        return rejoinWord;
      }
    });
  
    const rejoinSentence: string = scrambleSentenceArr.join(" ");
    setScrambledSentence(rejoinSentence); 
  }

  return (
    <div id="scrambled-word-block" className="bg-white p-4 mb-4">
      <h2 id="scrambled-word">{scrambledSentence}</h2>
      <p className="mb-0 text-end">sentence {counter} of 10</p>
    </div>
  );
}

export default Sentence;
