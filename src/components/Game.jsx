import { useMemo, useState } from 'react';
import { types } from '../lib/constans';
import Block from './Block/Block';
import Scene from './Scene';

const typesStep = {
  block: 'block',
  scene: 'scene',
};

const getContent = (name) => `You need to find ${name} and click on it so
you can rotate around the earth`;

const Game = () => {
  const [stepIndex, setStepIndex] = useState(0);

  const steps = useMemo(
    () => [
      {
        id: 0,
        type: typesStep.block,
        component: (
          <Block
            title='The North Pole'
            buttonContent='Ok'
            content={getContent('The North Pole')}
            onConfirm={() => setStepIndex((prev) => prev + 1)}
          />
        ),
      },
      {
        id: 1,
        type: typesStep.scene,
        component: <Scene onConfirm={() => setStepIndex((prev) => prev + 1)} type={types.pole} />,
      },

      {
        id: 2,
        type: typesStep.block,
        component: (
          <Block
            title='Africa '
            buttonContent='Ok'
            content={getContent(`Africa`)}
            onConfirm={() => setStepIndex((prev) => prev + 1)}
          />
        ),
      },
      {
        id: 3,
        type: typesStep.scene,
        component: <Scene onConfirm={() => setStepIndex((prev) => prev + 1)} type={types.africa} />,
      },

      {
        id: 4,
        type: typesStep.block,
        component: (
          <Block
            title='Australia'
            buttonContent='Ok'
            content={getContent('Australia')}
            onConfirm={() => setStepIndex((prev) => prev + 1)}
          />
        ),
      },
      {
        id: 5,
        type: typesStep.scene,
        component: <Scene onConfirm={() => setStepIndex((prev) => prev + 1)} type={types.australia} />,
      },

      {
        id: 6,
        type: typesStep.block,
        component: (
          <Block
            title='Finish'
            content='Cool, you found them all'
            onConfirm={() => setStepIndex(0)}
            buttonContent='Would you like to do it again?'
          />
        ),
      },
    ],
    []
  );

  const currentStep = steps[stepIndex];
  const progress = steps.filter(({ type }) => type === typesStep.scene);

  return (
    <>
      <div
        style={{
          width: '100vw',
          zIndex: 2,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '40px',
          position: 'fixed',
          top: '15px',
          left: '0',
        }}
      >
        {progress.map(({ id }) => (
          <div
            key={id}
            style={{
              background: id < currentStep.id ? 'green' : 'white',
              width: '10px',
              height: '10px',
              borderRadius: '50%',
              marginLeft: '10px',
            }}
          ></div>
        ))}
      </div>

      {steps[stepIndex].component}
    </>
  );
};

export default Game;
