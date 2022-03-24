import React from 'react';

interface Props {
  sentence: string[][]
}

const Sentence = ({sentence}: Props) => {
  console.log("sentence: ", sentence);
  
  const scrambleSentenceArr = sentence.map((nestedArr: string[]): string => {
    console.log("nestedArr: ", nestedArr);
    if (nestedArr.length <= 2) {
      const arrToStr = nestedArr.join("");
      console.log("arrToStr: ", arrToStr);
      return arrToStr;
    } else {
      let nestedArrCopy: string[] = [...nestedArr];
      console.log("nestedArrCopy: ", nestedArrCopy);
      nestedArrCopy.splice(0, 1);
      nestedArrCopy.splice(nestedArrCopy.length - 1, 1);
      console.log("nestedArrCopy: ", nestedArrCopy);

      if (nestedArrCopy.length === 1) {
        nestedArrCopy;
        console.log("nestedArrCopy with 1 length: ", nestedArrCopy);
      } else if (nestedArrCopy.length === 2) {
        const temp: string = nestedArrCopy[1];
        nestedArrCopy[1] = nestedArrCopy[0];
        nestedArrCopy[0] = temp;
      } else {
        nestedArrCopy.sort(() => 0.5 - Math.random());
      }

      nestedArrCopy.unshift(nestedArr[0]);
      nestedArrCopy.push(nestedArr[nestedArr.length - 1]);
      const rejoinWord: string = nestedArrCopy.join("");
      console.log("rejoinWord: ", rejoinWord);
      return rejoinWord;
    }
  });

  console.log("scrambleSentenceArr: ", scrambleSentenceArr);
  const rejoinSentence: string = scrambleSentenceArr.join(" ");
  console.log("rejoinSentence: ", rejoinSentence);
  return (
    <h2 id="scrambled-word">{rejoinSentence}</h2>
  );
}

export default Sentence;
