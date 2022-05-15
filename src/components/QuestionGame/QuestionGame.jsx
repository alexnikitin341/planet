import { useEffect, useState } from 'react';
import { typeQuestion } from '../../lib/constans';
import Question from '../Question/Question';
import styles from './QuestionGame.module.css';
import RoketBox from '../RocketBox/RoketBox';

const questions = [
  {
    type: typeQuestion.radio,
    title: 'Distance from the earth to the sun',
    question:
      'What is the distance from the earth to the sun if we know that light passes it in 8 minutes and 20 seconds and the speed of light is 300,000 km/s',
    answers: [
      {
        text: '100 000 000 km/s',
      },
      {
        text: '150 000 000 km/s',
      },
      {
        text: '300 000 0000 m/s',
      },
      {
        text: '500 000 000 km/s',
      },
    ].map((e, i) => ({ ...e, id: i })),
    answerIds: [1],
  },
  {
    type: typeQuestion.checkbox,
    title: 'Mars',
    question: 'what statements are true for Mars?',
    answers: [
      {
        text: 'Gravity on Mars is 62% less than on Earth',
        fact: 'Mars is half the size of Earth in diameter and 10 times lighter',
      },
      {
        text: 'Mars has two natural satellites',
        fact: 'The moons of Mars Deimos and Phobos',
      },
      {
        text: 'The mountains of Mars are lower than those of Earth',
        fact: 'The Martian Mount Olympus is the highest mountain in the Solar System, its height is 27.4 kilometers',
      },
      {
        text: 'The thin atmosphere of Mars consists mainly of oxygen',
        fact: 'The thin atmosphere of Mars consists mainly of carbon dioxide',
      },
    ].map((e, i) => ({ ...e, id: i })),
    answerIds: [0, 1],
  },
  {
    type: typeQuestion.checkbox,
    title: 'Mars1',
    question: 'what statements are true for Mars?',
    answers: [
      {
        text: 'Gravity on Mars is 62% less than on Earth',
        fact: 'Mars is half the size of Earth in diameter and 10 times lighter',
      },
      {
        text: 'Mars has two natural satellites',
        fact: 'The moons of Mars Deimos and Phobos',
      },
      {
        text: 'The mountains of Mars are lower than those of Earth',
        fact: 'The Martian Mount Olympus is the highest mountain in the Solar System, its height is 27.4 kilometers',
      },
      {
        text: 'The thin atmosphere of Mars consists mainly of oxygen',
        fact: 'The thin atmosphere of Mars consists mainly of carbon dioxide',
      },
    ].map((e, i) => ({ ...e, id: i })),
    answerIds: [0, 1],
  },
  {
    type: typeQuestion.checkbox,
    title: 'Mars2',
    question: 'what statements are true for Mars?',
    answers: [
      {
        text: 'Gravity on Mars is 62% less than on Earth',
        fact: 'Mars is half the size of Earth in diameter and 10 times lighter',
      },
      {
        text: 'Mars has two natural satellites',
        fact: 'The moons of Mars Deimos and Phobos',
      },
      {
        text: 'The mountains of Mars are lower than those of Earth',
        fact: 'The Martian Mount Olympus is the highest mountain in the Solar System, its height is 27.4 kilometers',
      },
      {
        text: 'The thin atmosphere of Mars consists mainly of oxygen',
        fact: 'The thin atmosphere of Mars consists mainly of carbon dioxide',
      },
    ].map((e, i) => ({ ...e, id: i })),
    answerIds: [0, 1],
  },
].map((e, i) => ({ ...e, id: i }));

const QuestionGame = () => {
  const [questionIndex, setQuestionIndex] = useState(0);
  const [showQuestion, setShowQuestion] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [userAnswers, setUserAnswers] = useState([]);

  const currentQuestion = questions[questionIndex];

  const onNextQuestion = ({ isRight, questionId }) => {
    setUserAnswers((answers) => [...answers, { isRight, questionId }]);
    if (questionIndex === questions.length - 1) {
      setShowResult(true);
      return setShowQuestion(false);
    }
    setQuestionIndex((prev) => prev + 1);
    setShowQuestion(false);
  };

  const delay = (seconds) => {
    setTimeout(() => {
      setShowQuestion(true);
    }, seconds * 1000);
  };

  useEffect(() => {
    delay(3);
  }, [questionIndex]);


  return (
    <div className={styles.container}>
      <div className={styles.animation_container}>
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
          {questions.map(({ id }, i) => (
            <div
              key={id}
              style={{
                background: userAnswers?.[i]?.isRight
                  ? 'green'
                  : i < questionIndex
                  ? 'red'
                  : 'white',
                width: '10px',
                height: '10px',
                borderRadius: '50%',
                marginLeft: '10px',
                marginRight: '10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            />
          ))}
        </div>
        <RoketBox questionIndex={questionIndex} />

        {questions.map((_, i) => (
          <p
            key={i}
            className={styles.field}
            style={{ alignSelf: i % 2 ? 'flex-end' : 'flex-start' }}
            onClick={() => showQuestion(true)}
          >
            {i + 1}
          </p>
        ))}
      </div>
      {showQuestion && <Question question={currentQuestion} onNextQuestion={onNextQuestion} />}
      {showResult && (
        <div>
          quantity {userAnswers.filter(({ isRight }) => isRight).length}/{questions.length}
        </div>
      )}
    </div>
  );
};

export default QuestionGame;
