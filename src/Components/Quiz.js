import React, {useState, useEffect} from 'react'
import Question from './Question'

export default function Quiz() {
  const [questions, setQuestions] = useState([])
  const [rows, setRows] = useState([])
  const [selectedAnswers, setSelectedAnswers] = useState({})
  const [answered, setAnswered] = useState(false)
  const [summary, setSummary] = useState('')



  useEffect(() => {
    fetch('https://opentdb.com/api.php?amount=5&category=9&difficulty=medium&type=multiple&encode=url3986')
      .then(response => response.json())
      .then(data => {
        const results = data.results.map(result => ({
          correctAnswerText: decodeURIComponent(result.correct_answer),
          incorrectAnswersText: result.incorrect_answers.map(answer => decodeURIComponent(answer)),
          question: decodeURIComponent(result.question)
        }))

        setQuestions(results)
      })
  }, [])

  useEffect(() => {
    if (questions.length) {
      const rows = questions.map((q, index) => <Question
        questionId={`question-${index}`}
        key={index}
        question={q.question}
        correctAnswerText={q.correctAnswerText}
        incorrectAnswersText={q.incorrectAnswersText}
        handleSelectAnswer={selectAnswer}
      />)

      setRows(rows)
    }
  }, [questions]) // eslint-disable-line react-hooks/exhaustive-deps


  function checkAnswers() {
    const numberOfQuestions = questions.length
    let numberOfCorrectAnswers = 0;

    for (let [questionId, answer] of Object.entries(selectedAnswers)) {
      let options = document.getElementById(questionId).querySelectorAll('.answer')

      // not options.forEach() because of "Function declared in a loop contains unsafe references to variable(s) 'numberOfCorrectAnswers'"
      for (let option of options) {
        const optionId = parseInt(option.dataset.optionId, 10)
        const optionText = option.dataset.optionText
        const correct = optionText === answer.correctAnswerText

        if (optionId === answer.selectedOptionId) {
          option.classList.add(correct ? 'correct' : 'incorrect')
          correct && numberOfCorrectAnswers++
        }
        else {
          option.classList.add(correct ? 'correct' : 'other')
        }
      }
    }

    setAnswered(true)
    summarize(numberOfQuestions, numberOfCorrectAnswers)
  }


  function summarize(numberOfQuestions, numberOfCorrectAnswers) {
    setSummary(`You scored ${numberOfCorrectAnswers} / ${numberOfQuestions} correct answers`)
  }


  function selectAnswer(event, selectedOptionText, correctAnswerText, selectedOptionId) {
    const target = event.target;

    setSelectedAnswers(oldAnswers => ({
      ...oldAnswers,
      [target.parentNode.parentNode.id]: {
        selectedOptionText,
        correctAnswerText,
        selectedOptionId
      }
    }))

    target.parentNode.childNodes.forEach(el => el.classList.remove('selected'))
    target.classList.add('selected')
  }


  function playAgain() {

  }


  const answerButton = <button
      className="check-answers-button"
      onClick={checkAnswers}
    >
      Check answers
    </button>

  const results = <div className="results">
    <div className="summary">{summary}</div>
    <button className="play-again-button" onClick={playAgain}>Play again</button>
  </div>

  return (
    <>
      <div className="quiz">{rows}</div>
      {!answered && answerButton}
      {answered && results}
    </>
  )
}

// TODO:
// add Play again button functionality
// prevent from selecting answers after checking them
// prevent from selecting text in answers
