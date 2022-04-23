import React, { useState, useEffect } from 'react';

import { QuestionHow } from './components';

const api_url = 'https://opentdb.com/api.php?amount=10&type=multiple';





function App() {
  const  [questions, setQuestions] = useState([]);
  const  [currentIndex, setCurrentIndex] = useState(0);
  const  [score, setScore] = useState(0);
  const  [showAnswers, setShowAnswers] = useState(false);

  useEffect(() => {
    fetch(api_url)
      .then(res => res.json())
      .then(data => {
        const questions = data.results.map((question) => 
        ({
          ...question,
          answers: [
            question.correct_answer,
            ...question.incorrect_answers,
          ].sort(() => Math.random() - 0.5),
        }));
        setQuestions(questions);
        });
   }, []);
   
  const handleAnswer = (answer) => {
    if (!showAnswers) {
      // stops double answers go over why that is
      if (answer === questions[currentIndex].correct_answer) {
        setScore(score + 1)
      }
    }

    setShowAnswers(true);
  };

  const handleNextQuestion = () => {
    setCurrentIndex(currentIndex + 1);

    setShowAnswers(false);
  };
  
  return questions.length > 0 ? (
    <div className='container'>
      {currentIndex >= questions.length ? (
        <h1 className='text-3xl text-black font-bold'>
          Game ended! Your Score is: {score}.
        </h1>
      ) : (
        <QuestionHow 
        data={questions[currentIndex]}
        showAnswers={showAnswers}
        handleNextQuestion={handleNextQuestion}
        handleAnswer={handleAnswer}
        />
      )}
    </div>
  ) : (
    <h2 className='text-2xl text-black font-bold'> It's Loading up</h2>
  );
}

export default App;
