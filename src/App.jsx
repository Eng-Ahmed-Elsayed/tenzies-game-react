import { useEffect, useState } from "react"
import { nanoid } from "nanoid"
import Confetti from 'react-confetti'

import Die from "./components/Die"

function App() {
  const [tenzies, setTenzies] = useState(false)
  const [diceArr, setDiceArr] = useState(allNewDice())

  const dieElements = diceArr.map((die) => (
    <Die 
    key={die.id} 
    value={die.value} 
    inHeld={die.inHeld} 
    id={die.id} 
    holdDice={() => holdDice(die.id)}
    />))

  function handelRoll() { 
    if (tenzies){
      setDiceArr(allNewDice())
      setTenzies(false)
    }
    else {
      setDiceArr(prevDice => prevDice.map(die => die.inHeld ? die : newDie() ))
    }
  }

  function holdDice(id) {
    setDiceArr(prevDice => prevDice.map(die => die.id === id ? {...die, inHeld: !die.inHeld} : die))
  }

  function newDie() {
    return {
      value: Math.floor((Math.random() * 6) + 1),
      inHeld: false,
      id: nanoid()
    }
}

  function allNewDice() {
    return [...Array(10)].map(x => newDie())
  }

  useEffect(() => {
    const allEqual = diceArr.every(die => die.value === diceArr[0].value)
    const allInHold = diceArr.every(die => die.inHeld === true)
    allEqual && allInHold && setTenzies(true)
  }, [diceArr])

  return (
    <div className="container">
        {tenzies && <Confetti className="confetti" />}
        <main className="main">
          
          <h1 className="main-header">Tenzies</h1>
          <p className="main-text">
            Roll until all dice are the same. 
            Click each die to freeze it at its current value between rolls.
          </p>
          <div className="die-buttons">
            {dieElements}
          </div>
          <button 
          type="button" 
          className="roll-btn btn" 
          onClick={handelRoll}>
            {tenzies ? "New Game" : "Roll"}
          </button>
        </main>
    </div>
  )
}

export default App
