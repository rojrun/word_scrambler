import React, {useRef, useEffect} from 'react';

interface Props {
  setScore: Function;
  setCounter: Function;
  setValues: Function;
}

const Winner = ({setScore, setCounter, setValues}: Props) => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  
  const handlePlayAgain = () => {
    setScore(0);
    setCounter(1);
    setValues([]);
  }

  useEffect(() => {
    buttonRef.current?.focus();
  });

  return (
    <div className="border border-primary py-5 my-5">
      <h2>You Win!!</h2>
      <button
        type="button"
        className="btn btn-success px-4 m-3"
        ref={buttonRef}
        onClick={handlePlayAgain}
      >
        Play again?
      </button>
    </div>
  );
}

export default Winner;
