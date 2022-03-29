import React, {useEffect} from 'react';

const Score = (props: any) => {
  console.log("score: ", props.score);
  useEffect(() => {}, [props.score]);
  return (
    <p>Score: {props.score}</p>
  );
}

export default Score;
