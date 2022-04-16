import React, {useState, useEffect, useMemo} from 'react';
import axios from 'axios';
import Sentence from './Sentence';
import Score from './Score';
import GuessingBlocks from './GuessingBlocks';
import Winner from './Winner';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../scss/App.scss';

const App = () => {
  const [counter, setCounter] = useState<number>(1);
  const [sentence, setSentence] = useState<any>();
  const [score, setScore] = useState<number>(0);
  const [values, setValues] = useState<string[][]>([]);

  // Fetch sentence from API, convert string to nested array of characters 
  const getSentence = (): void => {
    const url = `https://api.hatchways.io/assessment/sentences/${counter}`;
    axios.get(url)
      .then(response => {
        const data: string = response.data.data.sentence;
        const newData = data.charAt(0).toUpperCase() + data.slice(1).toLowerCase();

        const sentenceArr = newData.split(/(\s+)/).map((word: string): string[] => {
          const wordArr = word.split("");
          return wordArr;
        });
        
        const newSentenceArr =  sentenceArr.map((array: string[], index: number) => {      
          if (index % 2 === 1) {
            const newArray = sentenceArr[index - 1].concat(array);
            return newArray;
          }

          if (index === sentenceArr.length - 1) {
            return array;
          }   
        });
        
        const filteredArr = newSentenceArr.filter((array: any) => {
          return array !== undefined;
        });
        
        setSentence(filteredArr);
      })
      .catch(error => console.error(`Error: ${error}`));
  }

  const memoizedValues = useMemo(() => {
    if (values !== undefined && !values.length) {
      sentence?.map((word: string[]) => {
        const newWordArr = word.map((_char) => {
          return "";
        });
        setValues((values: string[][]) => [...values as string[][], newWordArr]);
      });  
    }
  }, [sentence]);

  useEffect(() => {
    if (counter <= 10) {
      getSentence();
    }
    memoizedValues;
  }, [counter]);

  return (
    <div className="container text-center">
      {
        counter <= 10
        ? <div>
            <h1>Word Scrambler</h1>
            <Sentence sentence={sentence} />
            <p className="mb-0">Guess the sentence! Start typing.</p>
            <p>The orange blocks are meant for spaces.</p> 
            <Score score={score} />
            <GuessingBlocks
              sentence={sentence}
              score={score}
              setScore={setScore}
              counter={counter}
              setCounter={setCounter} 
              values={values}
              setValues={setValues}
            />
          </div>
        : <Winner setCounter={setCounter} setScore={setScore} setValues={setValues} />  
      }
    </div>
  );
}

export default App;
