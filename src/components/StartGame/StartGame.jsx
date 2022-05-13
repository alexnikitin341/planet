import { useEffect, useRef, useState } from 'react';
import { types } from '../../lib/constans';
import useOnClickOutside from '../../lib/hooks/useOnClickOutside';
import Scene from '../Scene';
import styles from './StartGame.module.css';
import { ReactComponent as UpArrow } from '../icons/up_arrow_icon.svg';

const steps = [
  {
    title: 'Start',
    text: `Hi!\n
    This is a small game on the knowledge of our planet\n
    Are you ready to start?\n`,
    styles: { top: '50%', left: '50%', transform: 'translate(-50%, -50%)' },
  },
  {
    title: 'Progress',
    text: `This is your progress\n
  Successful tasks will be displayed in green\n 
  Tasks with errors will be displayed in red`,
    styles: { top: '105px', left: '50%', transform: 'translate(-50%, 0)' },
    isShowUpArrow: true,
  },
  {
    title: 'Error counter',
    text: `You have several attempts to find the desired.\n
    Every time you click on the planet is considered an attempt\n`,
    styles: { top: '105px', left: '10px' },
    isShowUpArrow: true,
  },
  {
    title: 'Tip',
    text: `Here you can see a hint of what you need to find.\n
    If it bothers you can close it by clicking on the cross\n`,
    styles: { top: '135px', right: '10px' },
    isShowUpArrow: true,
  },
  { title: 'Move', styles: {} },
].map((step, i) => ({ ...step, id: i }));

const StartGame = ({ start }) => {
  const [stepIndex, setStepIndex] = useState(0);

  const ref = useRef();
  const currentStep = steps[stepIndex];

  useOnClickOutside(ref, () => setStepIndex((prev) => prev + 1));

  useEffect(() => {
    if (stepIndex === steps.length - 1) {
      start();
    }
  }, [stepIndex]);

  return (
    <div className={styles.continer}>
      <Scene type={types.pole} onConfirm={() => {}} onError={() => {}} />

      <div className={styles.box_tip}>
        <div
          ref={ref}
          style={{
            background: 'white',
            position: 'absolute',
            borderRadius: '10px',
            padding: '10px',
            ...currentStep.styles,
          }}
        >
          {currentStep.isShowUpArrow && (
            <UpArrow
              width='40px'
              height='40px'
              fill='green'
              style={{
                top: '-40px',
                left: '50%',
                transform: 'translate(-50%, 0)',
                position: 'absolute',
              }}
            />
          )}
          <p>{currentStep.text}</p>
          <button onClick={() => setStepIndex((prev) => prev + 1)}> Next step</button>
        </div>
      </div>
    </div>
  );
};

export default StartGame;
