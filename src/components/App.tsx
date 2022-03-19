import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Sentence from './Sentence';
import Score from './Score';
import GuessingBlocks from './GuessingBlocks';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../sass/App.scss';

interface WordArray {
  sentence: string[];
}

interface Data {
  data: any;
}

const App = () => {
  const [counter, setCounter] = useState(1);
  const [sentence, setSentence] = useState<WordArray[]>([]);
  const [score, setScore] = useState(0);

  useEffect(() => {
    getSentence();
  }, [counter]);

  const url = `https://api.hatchways.io/assessment/sentences/${counter}`;
  const getSentence = () => {
    axios.get<Data>(url)
      .then(response => {
        const responseData = response.data.data.sentence;
        const scrambledSentence: string[] = responseData.split(" ").map((word: string)  => {
        
        
          console.log("word: ", word);
          const wordArr: string[] = word.split(" ");
          console.log("wordArr: ", wordArr);
          const letterArr: string[] = wordArr[0].split("");
          console.log("letterArr: ", letterArr);
          console.log("sentence: ", sentence);
          
          setSentence([...sentence, letterArr]);
          console.log("sentence: ", sentence);
          // if (letterArr.length > 2) {
          //   const letterArrCopy: string[] = [...letterArr];
          //   letterArrCopy.splice(0, 1);
          //   letterArrCopy.splice(letterArrCopy.length - 1, 1);
            
          //   if (letterArrCopy.length === 2) {
          //     const temp: string = letterArrCopy[1];
          //     letterArrCopy[1] = letterArrCopy[0];
          //     letterArrCopy[0] = temp;
              
          //   } else {
          //     letterArrCopy.sort(() => 0.5 - Math.random());
          //   }
            
          //   letterArrCopy.unshift(letterArr[0]);
          //   letterArrCopy.push(letterArr[letterArr.length - 1]);
          //   const rejoinWord: string = letterArrCopy.join('');
          //   return rejoinWord;

          // } else {
          //   const oneLetterArrToString: string = letterArr.toString();
          //   return oneLetterArrToString;
          // }
        });
        const rejoinScrambledSentence: string = scrambledSentence.join(" ");
        
        setSentence(rejoinScrambledSentence);
      })
      .catch(error => console.error(`Error: ${error}`));
  }

  return (
    <div className="App container">
      <h1>Word Scrambler</h1>
      <Sentence sentence={sentence} />
      <p>Guess the sentence! Start typing.</p>
      <p>The yellow blocks are meant for spaces.</p> 
      <Score score={score}/>
      <GuessingBlocks />
    </div>
  );
}

export default App;
