import { useState } from 'react';
import { typeQuestion } from '../../lib/constans';
import CheckboxQuestion from './CheckboxQuestion';
import RadioQuestion from './RadioQuestion';
import styles from './Question.module.css';

const Question = ({ question, onNextQuestion }) => {
  const componentsFromType = {
    [typeQuestion.checkbox]: CheckboxQuestion,
    [typeQuestion.radio]: RadioQuestion,
  };

  const CurrentComponent = componentsFromType[question.type];

  return (
    <div className={styles.container}>
      <div className={styles.block}>
        <CurrentComponent questionData={question} onSubmit={onNextQuestion} />
      </div>
    </div>
  );
};

export default Question;
