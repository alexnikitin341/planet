import { useState } from 'react';

const CheckboxQuestion = ({ questionData, onSubmit }) => {
  const { title, question, answers, answerIds, id } = questionData;

  const [chooseAnswers, setChooseAnswers] = useState([]);
  const [isAnswered, setIsAnswered] = useState(false);

  const checkRightAnswer = ({ answerIds, chooseAnswers }) => {
    if (chooseAnswers.length !== answerIds.length) {
      return false;
    }
    return answerIds.sort().every((answerId, i) => answerId === chooseAnswers.sort()[i]);
  };

  const getColorAnswer = ({ isAnswered, answerIds, chooseAnswers, currentAnswerId }) => {
    if (!isAnswered) {
      return 'black';
    }

    if (answerIds.includes(currentAnswerId)) {
      return 'green';
    }

    if (chooseAnswers.includes(currentAnswerId)) {
      return 'red';
    }

    return 'black';
  };

  const onChange = (id) => {
    !isAnswered &&
      setChooseAnswers((chooseAnswers) => {
        if (chooseAnswers.includes(id)) {
          return chooseAnswers.filter((chooseAnswerId) => chooseAnswerId !== id);
        }

        return [...chooseAnswers, id];
      });
  };

  return (
    <>
      <h2>{title}</h2>
      <h4>{question}</h4>
      {answers.map((answer) => (
        <div key={answer.id}>
          <label
            style={{
              color: getColorAnswer({
                isAnswered,
                currentAnswerId: answer.id,
                chooseAnswers,
                answerIds,
              }),
            }}
          >
            <input
              type='checkbox'
              value={answer.id}
              checked={chooseAnswers.includes(answer.id)}
              onChange={() => onChange(answer.id)}
            />
            <span>{answer.text}</span>
          </label>
        </div>
      ))}

      {isAnswered ? (
        <button
          onClick={() =>
            onSubmit({ isRight: checkRightAnswer({ answerIds, chooseAnswers }), questionId: id })
          }
        >
          Next
        </button>
      ) : (
        <button onClick={() => setIsAnswered(true)}>Submit</button>
      )}
    </>
  );
};

export default CheckboxQuestion;
