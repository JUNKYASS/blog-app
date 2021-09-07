import React from 'react';
import { QuestionsProps } from '../../types';
import './style.scss';

const Questions: React.FC<QuestionsProps> = ({ data }) => {
  return (
    <div className="questions">
      {
        !data ? (
          <p>Temporary unavailable</p> // Если не передали data
        ) : data.map((item, index) => {
          return (
            <div className="item" key={index}>
              <div className="question">{item.question}</div>
              <div className="answer">{item.answer}</div>
            </div>
          );
        })
      }
    </div>
  );
};

export {
  Questions
};
