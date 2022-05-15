import { useState } from 'react';
import { blockAfterSceneContent, steps, typesStep } from '../lib/constans';
import { getContent } from '../lib/utils';
import Block from './Block/Block';
import Scene from './Scene';
import StartGame from './StartGame/StartGame';

const Game = () => {
  const [stepIndex, setStepIndex] = useState(0);
  const [errorIds, setErrorIds] = useState([]);

  const onError = (id) => {
    setErrorIds((prev) => [...prev, id]);
    setStepIndex((prev) => prev + 1);
  };

  const startNewGame = () => {
    setStepIndex(1);
    setErrorIds([]);
  };

  const currentStep = steps[stepIndex];
  const progress = steps.filter(({ type }) => type === typesStep.scene);
  const id = currentStep.id;

  const finishId = steps[steps.length - 1].id;
  const isError = errorIds.some(
    (errorId) => steps.find(({ id }) => id === errorId).typeScene === currentStep.title
  );

  return (
    <>
      <div
        style={{
          zIndex: 4,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '40px',
          position: 'fixed',
          top: '15px',
          left: '50%',
          transform: 'translate(-50%, 0)',
        }}
      >
        {progress.map(({ id }) => (
          <div
            key={id}
            style={{
              background: errorIds.includes(id) ? 'red' : id < currentStep.id ? 'green' : 'white',
              width: '10px',
              height: '10px',
              borderRadius: '50%',
              marginLeft: '10px',
              marginRight: '10px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          ></div>
        ))}
      </div>

      <Scene
        id={id}
        type={currentStep.typeScene || currentStep.title}
        onConfirm={() => setStepIndex((prev) => prev + 1)}
        onError={() => onError(id)}
      />

      {currentStep.type === typesStep.start && (
        <StartGame start={() => setStepIndex((prev) => prev + 1)} />
      )}

      {currentStep.type === typesStep.block && (
        <Block
          id={id}
          title={currentStep.title}
          onConfirm={id === finishId ? startNewGame : () => setStepIndex((prev) => prev + 1)}
          buttonContent={id === finishId ? 'Would you like to do it again?' : 'Ok'}
          content={
            id === finishId
              ? `Cool, you found ${progress.filter(({ id }) => !errorIds.includes(id)).length}/${
                  progress.length
                }`
              : getContent(currentStep.title)
          }
        />
      )}

      {currentStep.type === typesStep.blockAfterScene && (
        <Block
          id={id}
          title={currentStep.title}
          onConfirm={() => setStepIndex((prev) => prev + 1)}
          buttonContent={'Next task'}
          content={
            isError
              ? `Oh, you clicked wrong three times \n 
                ${blockAfterSceneContent[currentStep.title].text}`
              : `Cool, you found \n 
              ${blockAfterSceneContent[currentStep.title].text}`
          }
        />
      )}
    </>
  );
};

export default Game;
