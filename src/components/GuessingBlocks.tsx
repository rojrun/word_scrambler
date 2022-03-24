import React from 'react';

interface Props {
  sentence: string[][]
}
const GuessingBlocks = ({sentence}: Props) => {
  console.log("guessingblocks sentence: ", sentence);

  return (
    <div>
      <input />
    </div>
  );
}

export default GuessingBlocks;
