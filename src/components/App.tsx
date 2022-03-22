import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Sentence from './Sentence';
import Score from './Score';
import GuessingBlocks from './GuessingBlocks';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../sass/App.scss';

const App = () => {
  const [counter, setCounter] = useState(1);
  const [sentence, setSentence] = useState<any[]>([]);
  const [score, setScore] = useState(0);

  useEffect(() => {
    getSentence();
  }, [counter]);

  const url: string = `https://api.hatchways.io/assessment/sentences/${counter}`;
  const getSentence = (): void => {
    axios.get<any>(url)
      .then(response => {
        const data: string = response.data.data.sentence;
        const scrambledSentence = data.split(" ").map((word: string): string[]  => {
          const wordArr: string[] = word.split("");
          return wordArr;
        });
      
        setSentence([...sentence, scrambledSentence]);
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
