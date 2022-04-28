import React, {useState, useEffect} from 'react';


export default function Question({question, correctAnswerText, incorrectAnswersText, handleSelectAnswer, questionId}) {
  const [answers, setAnswers] = useState([])


  useEffect(() => {
    let a = [correctAnswerText, ...incorrectAnswersText].sort()

    setAnswers(a.map((optionText, optionId) => <span
      key={optionId}
      className='answer'
      optionid={optionId}
      optiontext={optionText}
      onClick={event => handleSelectAnswer(event, optionText, correctAnswerText, optionId)}
    >{optionText}</span>))
  }, [question]) // eslint-disable-line react-hooks/exhaustive-deps
  
  
  return (
    <div id={questionId}>
      <div className="question">{question}</div>
      <div>{answers}</div>
      <hr />
    </div>
  )
}
