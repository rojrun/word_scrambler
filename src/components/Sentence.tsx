import React, {useState, useEffect} from 'react';
import axios from 'axios';

// interface Sentence {
//   data: any;
// }

// const Sentence = () => {
//   const [counter, setCounter] = useState(1);
//   const [sentence, setSentence] = useState("");
//   const [score, setScore] = useState(0);

//   useEffect(() => {
//     getSentence();
//   }, [counter]);

//   const url = `https://api.hatchways.io/assessment/sentences/${counter}`;
//   const getSentence = () => {
//     axios.get<Sentence>(url)
//       .then(response => {
//         const responseData = response.data.data.sentence;
//         const scrambledSentence: string[] = responseData.split(" ").map((word:string)  => {
//           const wordArr: string[] = word.split(" ");
//           const letterArr: string[] = wordArr[0].split("");
          
//           if (letterArr.length > 2) {
//             const letterArrCopy: string[] = [...letterArr];
//             letterArrCopy.splice(0, 1);
//             letterArrCopy.splice(letterArrCopy.length - 1, 1);
            
//             if (letterArrCopy.length === 2) {
//               const temp: string = letterArrCopy[1];
//               letterArrCopy[1] = letterArrCopy[0];
//               letterArrCopy[0] = temp;
              
//             } else {
//               letterArrCopy.sort(() => 0.5 - Math.random());
//             }
            
//             letterArrCopy.unshift(letterArr[0]);
//             letterArrCopy.push(letterArr[letterArr.length - 1]);
//             const rejoinWord: string = letterArrCopy.join('');
//             return rejoinWord;

//           } else {
//             const oneLetterArrToString: string = letterArr.toString();
//             return oneLetterArrToString;
//           }
//         });
//         const rejoinScrambledSentence: string = scrambledSentence.join(" ");
        
//         setSentence(rejoinScrambledSentence);
//       })
//       .catch(error => console.error(`Error: ${error}`));
//   }

//   return (
//     <h2 id="scrambled-word">{sentence}</h2>
//   );
// }

interface Props {
  sentence: any[]
}

const Sentence = ({sentence}: Props) => {
  console.log("sentence: ", sentence);
  const scrambleSentenceArr = sentence.map((nestedArr: string[]): undefined | string => {
    console.log("nestedArr: ", nestedArr);
    if (nestedArr.length <= 2) {
      const nestedArrToStr: string = nestedArr.join("");
      return nestedArrToStr;
    } else {
      const nestedArrCopy: string[] = [...nestedArr];
      console.log("nestedArrCopy: ", nestedArrCopy);
      nestedArrCopy.splice(0, 1);
      nestedArrCopy.splice(nestedArrCopy.length - 1, 1);
      console.log("nestedArrCopy: ", nestedArrCopy);

      if (nestedArrCopy.length === 2) {
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
