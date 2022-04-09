import React from 'react';

interface Props {
  score: number
}

const Score = ({score}: Props) => {
  return (
    <p>Score: {score}</p>
  );
}

export default Score;
