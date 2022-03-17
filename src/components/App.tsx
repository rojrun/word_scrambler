import React from 'react';
import Sentence from './Sentence';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../sass/App.scss';

const App = () => {
  return (
    <div className="App container">
      <h1>Word Scrambler</h1>
      <Sentence />
    </div>
  );
}

export default App;
