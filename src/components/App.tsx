import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Sentence from './Sentence';
import Score from './Score';
import GuessingBlocks from './GuessingBlocks';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../sass/App.scss';

const App = () => {
  const [counter, setCounter] = useState(1);
  const [sentence, setSentence] = useState<any>();
  const [score, setScore] = useState(0);

  useEffect(() => {
    getSentence();
  }, [counter]);

  // Fetch sentence from API, convert string to nested array of characters
  const url = `https://api.hatchways.io/assessment/sentences/${counter}`;
  const getSentence = (): void => {
    axios.get(url)
      .then(response => {
        const data: string = response.data.data.sentence;
        const sentenceArr = data.split(" ").map((word: string): string[] => {
          const wordArr = word.split("");
          return wordArr;
        });
        
        setSentence(sentenceArr);
      })
      .catch(error => console.error(`Error: ${error}`));
  }

  return (
    <div className="container text-center">
      <h1>Word Scrambler</h1>
      <Sentence sentence={sentence} />
      <p>Guess the sentence! Start typing.</p>
      <p>The yellow blocks are meant for spaces.</p> 
      <Score score={score} />
      <GuessingBlocks sentence={sentence} />
    </div>
  );
}

export default App;
