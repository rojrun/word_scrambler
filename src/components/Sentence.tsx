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
const Sentence = (props: any) => {

  return (
    <h2 id="scrambled-word">{props.sentence}</h2>
  );
}

export default Sentence;
