import { memo, useMemo } from 'react';
import styledComponents from 'styled-components';
import { keyframes } from 'styled-components';
import { ReactComponent as Rocket } from '../icons/rocket.svg';

const RoketBox = ({ questionIndex }) => {
  const isLeft = useMemo(() => questionIndex % 2 === 0, [questionIndex], [questionIndex]);

  const getLeftPosition = (isLeft) => {
    return isLeft
      ? 'left:calc(30px + 10px + 5vw - 4vw);'
      : 'left: calc(100% - 30px - 10px - 5vw - 4vw);';
  };

  const getTopPosition = (questionIndex) => {
    return `top: calc(100px + ${questionIndex * 20}px + ${questionIndex * 10}vw - 3vw);`;
  };

  const horizontalMove = useMemo(
    () => keyframes`
            0% {
                ${getLeftPosition(!isLeft)}
            }
        
            50% {
                transform: rotate(${isLeft ? '-90deg' : '90deg'});
            }
        
            100% {
                ${getLeftPosition(isLeft)}
                transform: rotate(0deg);
            }
        `,
    [isLeft]
  );

  const verticalMove = useMemo(
    () => keyframes`
            0% {
               ${getTopPosition(questionIndex - 1)}
            }
            
            100% {
               ${getTopPosition(questionIndex)}
            }
        `,
    [isLeft]
  );
  const RoketBox = styledComponents.div`
    width: 8vw;
    height: 8vw;
    position: absolute;
    animation-duration: 3s, 3s;
    animation-name: ${horizontalMove}, ${verticalMove};
    ${getLeftPosition(isLeft)}
    ${getTopPosition(questionIndex)}
`;

  return (
    <RoketBox>
      <Rocket
        fill='red'
        style={{
          width: '100%',
          height: '100%',
        }}
      />
    </RoketBox>
  );
};

export default memo(RoketBox);
