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
    <div className="bg-white py-5" id="winner">
      <h2>You Win!!</h2>
      <button
        type="button"
        className="btn button-next text-white px-4 m-3"
        ref={buttonRef}
        onClick={handlePlayAgain}
      >
        Play again?
      </button>
    </div>
  );
}

export default Winner;
