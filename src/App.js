import { useState } from 'react';
import './App.css';
import Block from './components/Block/Block';
import Game3D from './components/Game';
import QuestionGame from './components/QuestionGame/QuestionGame';

function App() {
  const [showStart, setShowStart] = useState(false);
  const [show3DGame, setShow3DGame] = useState(false);
  const [showQuestionGame, setShowQuestionGame] = useState(false);

  const startGame = () => {
    setShowStart(false);
    setShow3DGame(true);
  };
  const endGame = ()=>{
    setShow3DGame(false)
    setShowQuestionGame(false)
  }

  return (
    <div className='App'>
      <div className='scene'>
        {!show3DGame && !showQuestionGame && (
          <div
            style={{
              paddingTop: '20vh',
              width: '100vw',
              display: 'flex',
              justifyContent: 'space-around',
            }}
          >
            <button onClick={() => setShowQuestionGame(true)}>Start mini game</button>
            <button onClick={() => setShow3DGame(true)}>Start 3D game</button>
          </div>
        )}

        {showQuestionGame && <QuestionGame onEndGame={endGame}/>}

        {showStart && (
          <Block
            title='Start game'
            content='Are you ready to start?'
            buttonContent='Start 3D game'
            onConfirm={startGame}
            style={{ background: 'url(http://localhost:3000/space.jpeg)' }}
          />
        )}
        {show3DGame && <Game3D onEndGame={endGame}/>}
      </div>
    </div>
  );
}

export default App;
