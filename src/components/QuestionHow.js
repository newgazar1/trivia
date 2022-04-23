import React from 'react';

const QuestionHow = ({
    showAnswers,
    handleAnswer,
    handleNextQuestion,
    data: { question, correct_answer, answers},
}) => {
    return ( 
        <div className='flex flex-col'>
            <div className='bg-gray-300 text-blue-800 p-10 rounded shadow-md'>
                <h2
                    className='text-2xl'
                    dangerouslySetInnerHTML={{__html:question}}
                />
            </div>
            <div className='flex flex-wrap mt-4 justify-around'>
                {answers.map((answer, idx) => {
                    const textColor = showAnswers
                        ? answer === correct_answer
                            ? 'text-green-700'
                            : 'text-red-700'
                        : 'text-blue-700';
                    return (
                        <button
                            key={idx}
                            className={`bg-gray-300 ${textColor} p-5 font-semibold rounded shadow`}
                            onClick={() => handleAnswer(answer)}dangerouslySetInnerHTML={{__html: answer}}
                            /> 
                    );
                })}
            </div>
            {showAnswers && (
                <button
                    onClick={handleNextQuestion}
                    className={`ml-auto bg-blue-700 text-white p-5 font-semibold rounded shadow mt-5`}>
                        Next Question
                    </button>
            )}
        </div>
    );
};

export default QuestionHow;