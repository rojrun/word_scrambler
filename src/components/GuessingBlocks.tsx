import React, {useRef, useEffect} from 'react';

interface Props {
  sentence: string[][]
}

// Render blocks based on shape of Sentence array
const GuessingBlocks = ({sentence = []}: Props) => {
  const inputRef = useRef<HTMLInputElement>(null);
  
  useEffect(() => {
    if (inputRef.current !== null) {
      (inputRef.current.firstChild?.firstChild as HTMLElement)?.focus();     
    }
  }, [sentence]);

  const handleGuess = (e: React.ChangeEvent<HTMLInputElement>, wordIn: number, charIn: number): void => {
    const guess = e.target.value;
    const element = e.target;
    if (guess === sentence[wordIn][charIn]) {
      console.log("e: ", e);
      console.log("guess: ", guess);
      if (element.classList.contains("bg-warning")) {
        console.log("element: ", element);
        element.classList.remove("bg-warning");
        element.className += " bg-success text-white";
        console.log("spaces (element.nextSibling as HTMLElement)? : ", (element.nextSibling));
      } else {
        element.className += " bg-success text-white";
        console.log("no space (element.nextSibling as HTMLElement)? : ", (element.nextSibling));
      }    
      (element.nextElementSibling as HTMLElement)?.focus();
      console.log("ref: ", inputRef);
    } 
  }

  // return (
  //   <div ref={inputRef}>
  //     {
  //       sentence.map((nestedArr: string[], wordInd: number) => {
  //         return (
  //           <div className="row" key={wordInd + 1}>
  //             {
  //               nestedArr.map((char: string, charInd: number) => {
  //                 let bgColor = "";
  //                 if (charInd === 0 && char === " ") {
  //                   bgColor = "bg-warning";
  //                 }
                
  //                 return (
  //                   <input
  //                     className={`col text-center m-2 ${bgColor}`} type="text" id="guess" autoComplete="off"
  //                     onChange={(e) => handleGuess(e, wordInd, charInd)} key={charInd + 1} maxLength={1}
  //                   />
  //                 );
  //               })
  //             }
  //           </div>
  //         );
  //       })      
  //     }
  //   </div>
  // );

  const makeRow = (ind: number) => {return <div key={ind + 1} className="row"></div>};
  const makeInput = (ind: number) => {return <input className="col text-center m-2" type="text" id="guess" autoComplete="off" key={ind + 1} maxLength={1} />};

  const row = sentence.map((nestedArr: string[], wordInd: number) => {
    if (nestedArr[0] !== " ") {
      
    }
  });

  

  return (
    <div ref={inputRef}>
      {row}
    </div>
  );
}

export default GuessingBlocks;
