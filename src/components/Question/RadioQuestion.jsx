import { useState } from 'react';

const RadioQuestion = ({ questionData, onSubmit }) => {
  const { title, question, answers, answerIds, id } = questionData;

  const [chooseAnswer, setChooseAnswer] = useState(answers[0].id);
  const [isAnswered, setIsAnswered] = useState(false);

  const getColorAnswer = ({ isAnswered, answerIds, chooseAnswer, currentAnswerId }) => {
    return isAnswered
      ? answerIds.includes(currentAnswerId)
        ? 'green'
        : chooseAnswer === currentAnswerId
        ? 'red'
        : 'black'
      : 'black';
  };

  const checkRightAnswer = ({ answerIds, chooseAnswer }) => {
    return answerIds.includes(chooseAnswer);
  };

  return (
    <div>
      <h2>{title}</h2>
      <h4>{question}</h4>
      {answers.map((answer) => (
        <div key={answer.id}>
          <label
            style={{
              color: getColorAnswer({
                isAnswered,
                currentAnswerId: answer.id,
                chooseAnswer,
                answerIds,
              }),
            }}
          >
            <input
              type='radio'
              value={answer.id}
              checked={chooseAnswer === answer.id}
              onChange={() => !isAnswered && setChooseAnswer(answer.id)}
            />
            {answer.text}
          </label>
        </div>
      ))}

      {isAnswered ? (
        <button
          onClick={() =>
            onSubmit({ isRight: checkRightAnswer({ answerIds, chooseAnswer }), questionId: id })
          }
        >
          Next
        </button>
      ) : (
        <button onClick={() => setIsAnswered(true)}>Submit</button>
      )}
    </div>
  );
};

export default RadioQuestion;
