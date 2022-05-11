import { useState } from 'react';
import './App.css';
import Block from './components/Block/Block';
import Game from './components/Game';

function App() {
  const [showStart, setShowStart] = useState(true);
  const [show3DGame, setShow3DGame] = useState(false);

  const startGame = () => {
    setShowStart(false);
    setShow3DGame(true);
  };

  return (
    <div className='App'>
      <div className='scene'>
        {showStart && (
          <Block
            title='Start game'
            content='Are you ready to start?'
            buttonContent='Start 3D game'
            onConfirm={startGame}
          />
        )}
        {show3DGame && <Game />}
      </div>
    </div>
  );
}

export default App;
