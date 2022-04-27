import React from 'react'
import Welcome from './Components/Welcome'
import Quiz from './Components/Quiz'

export default function App() {
  const [inGame, setInGame] = React.useState(false)


  function repositionBlobs() {
    const blob1 = document.getElementsByClassName('blob1')[0]
    const blob2 = document.getElementsByClassName('blob2')[0]
    blob1.style.top = '-430px'
    blob1.style.right = '-430px'
    blob2.style.bottom = '-500px'
    blob2.style.left = '-400px'
  }

  
  function clickStart() {
    repositionBlobs()
    setInGame(true)
  }

  return (
    <main>
      <div className="blob1"></div>
      <div className="blob2"></div>
      {inGame ? <Quiz /> : <Welcome onClick={clickStart}/>}
    </main>
  );
}
