import React, {useState, useEffect} from 'react';
import axios from 'axios';

interface Sentence {
  data: any;
}

const Sentence = () => {
  const [counter, setCounter] = useState(1);
  const [sentence, setSentence] = useState("");

  useEffect(() => {
    getSentence();
  }, []);

  const url = `https://api.hatchways.io/assessment/sentences/${counter}`;
  const getSentence = () => {
    axios.get<Sentence>(url)
      .then(response => {
        const responseData = response.data.data.sentence;
        console.log("resp: ", responseData);
        const scrambledSentence = responseData.split(" ").map(word => {
          console.log("word: ", word);
          const wordArr = word.split(" ");
          console.log("wordArr: ", wordArr);
          const letterArr = wordArr[0].split("");
          console.log("letterArr: ", letterArr);

          if (letterArr.length > 2) {
            let letterArrCopy = new Array(letterArr);
            console.log("letterArrCopy: ", letterArrCopy[0]);
            letterArrCopy[0].splice(0, 1);
            letterArrCopy[0].splice(letterArrCopy[0].length - 1, 1);
            console.log("letterArrCopy: ", letterArrCopy[0]);
            letterArrCopy[0].sort(() => 0.5 - Math.random());
            console.log("letterArrCopy: ", letterArrCopy[0]);
            console.log('letterArr[0]: ', letterArr);
            letterArrCopy[0].unshift(letterArr[0]);
            letterArrCopy[0].push(letterArr[letterArr.length - 1]);
            console.log("letterArrCopy: ", letterArrCopy[0]);
          }
        });

        
        setSentence(scrambledSentence);
      })
      .catch(error => console.error(`Error: ${error}`));
  }

  return (
    <p id="scrambled-word">{sentence}</p>
  );
}

export default Sentence;
