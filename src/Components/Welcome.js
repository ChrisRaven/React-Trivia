export default function Welcome({onClick}) {
  return (
    <div className="welcome-container">
      <h1 className="welcome-title">Quizzical</h1>
      <h4 className="welcome-description">Let's play!</h4>
      <button className="start-quiz-button" onClick={onClick}>Start quiz</button>
    </div>
  )
}
