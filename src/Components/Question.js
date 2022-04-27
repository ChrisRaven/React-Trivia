import React, {useState, useEffect} from "react";


export default function Question({question, correctAnswer, incorrectAnswers, handleSelectAnswer, id}) {
  const [answers, setAnswers] = useState([])

  useEffect(() => {
    let a = [correctAnswer, ...incorrectAnswers].sort()

    setAnswers(a.map((el, index) => <span
      key={index}
      className='answer'
      optionid={index}
      optiontext={el}
      onClick={event => handleSelectAnswer(event, el, correctAnswer, index)}
    >{el}</span>))
  }, [question]) // eslint-disable-line react-hooks/exhaustive-deps
  
  return (
    <div id={id}>
      <div className="question">{question}</div>
      <div>{answers}</div>
      <hr />
    </div>
  )
}
