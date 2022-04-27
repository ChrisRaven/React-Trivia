import React, {useState, useEffect} from "react"
import Question from './Question'

export default function Quiz() {
  const [questions, setQuestions] = useState([])
  const [rows, setRows] = useState([])
  const [selectedAnswers, setSelectedAnswers] = useState({})


  useEffect(() => {
    fetch('https://opentdb.com/api.php?amount=5&category=9&difficulty=medium&type=multiple&encode=url3986')
      .then(response => response.json())
      .then(data => {
        const results = data.results.map(result => ({
          correctAnswer: decodeURIComponent(result.correct_answer),
          incorrectAnswers: result.incorrect_answers.map(answer => decodeURIComponent(answer)),
          question: decodeURIComponent(result.question)
        }))

        setQuestions(results)
      })
  }, [])

  useEffect(() => {
    if (questions.length) {
      const rows = questions.map((q, index) => <Question
        id={`question-${index}`}
        key={index}
        question={q.question}
        correctAnswer={q.correctAnswer}
        incorrectAnswers={q.incorrectAnswers}
        handleSelectAnswer={selectAnswer}
      />)

      setRows(rows)
    }
  }, [questions]) // eslint-disable-line react-hooks/exhaustive-deps


  function checkAnswers() {
    for (let [questionId, answer] of Object.entries(selectedAnswers)) {
      let options = document.getElementById(questionId).querySelectorAll('.answer')

      options.forEach(option => {
        const optionId = parseInt(option.getAttribute('optionid'), 10)
        const optionText = option.getAttribute('optionText')
        const selectedOptionId = answer.optionId
        const correctAnswer = answer.correctAnswer

        if (optionId === selectedOptionId) {// sprawdzamy opcję wybraną przez użytkownika
          if (optionText === correctAnswer) {
            option.classList.add('correct')
            return
          }

          option.classList.add('incorrect')
          return
        }

        if (optionText === correctAnswer) {
          option.classList.add('correct')
          return
        }

        option.classList.add('other')
        return
      })
    }
  }


  function selectAnswer(event, selectedOption, correctAnswer, optionId) {
    const target = event.target;

    setSelectedAnswers(oldAnswers => ({
      ...oldAnswers,
      [target.parentNode.parentNode.id]: {
        selectedOption: selectedOption,
        correctAnswer: correctAnswer,
        optionId: optionId
      }
    }))

    target.parentNode.childNodes.forEach(el => el.classList.remove('selected'))
    target.classList.add('selected')
  }


  return (
    <>
      <div className="quiz">{rows}</div>
      <button
        className="check-answers-button"
        onClick={checkAnswers}
      >
        Check answers
      </button>
    </>
  )
}

// TODO:
// add results and Play again button
