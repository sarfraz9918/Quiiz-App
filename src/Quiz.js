import React, { useState } from 'react';
import quizData from './quizData';

const Quiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswers, setUserAnswers] = useState(Array(quizData.length).fill(null));
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);

  const handleOptionSelect = (selectedOption) => {
    const updatedAnswers = [...userAnswers];
    updatedAnswers[currentQuestion] = selectedOption;
    setUserAnswers(updatedAnswers);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    if (currentQuestion + 1 < quizData.length) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      calculateScore();
    }
  };

  const calculateScore = () => {
    let newScore = 0;
    userAnswers.forEach((answer, index) => {
      if (answer === quizData[index].correctAnswer) {
        newScore++;
      }
    });
    setScore(newScore);
    setShowScore(true);
  };

  return (
    <div className="quiz-container">
      {!showScore ? (
        <>
          <h2>{quizData[currentQuestion].question}</h2>
          <form>
            {quizData[currentQuestion].options.map((option, index) => (
              <label key={index}>
                <input
                  type="radio"
                  name="answer"
                  value={option}
                  checked={userAnswers[currentQuestion] === option}
                  onChange={() => handleOptionSelect(option)}
                />
                {option}
              </label>
            ))}
            <button onClick={handleSubmit}>
              {currentQuestion + 1 < quizData.length ? 'Next' : 'Submit'}
            </button>
          
          </form>
        </>
      ) : (
        <div className='score'>
          <h2 >Your Final Score : {score} out of {quizData.length}</h2>
          
        </div>
      )}
    </div>
  );
};

export default Quiz;
