import React, { useEffect, useState } from 'react'
import Die from "../Die/Die";
import Toggle from '../Toggle/Toggle';
import Stats from '../Stats/Stats';
import Confetti from 'react-confetti';
import "./App.css";


const App = () => {

  //set state
  const [diceArr, setDiceArr] = useState(makeNewArr());
  const [isConfettiActive, setIsConfettiActive] = useState(false);
  const [rollCount, setRollCount] = useState(0);
  const [time, setTime] = useState({ms:0, s:0, m:0, h:0});
  const [timerInterv, setTimerInterv] = useState();
  const [bestTime, setBestTime] = useState({ms:0, s:0, m:0, h:0});
  const [delay, setDelay] = useState(70);
  const [useNumbers, setUseNumbers] = useState(false);

  function makeNewArr() {
    return Array.from({ length: 10 }, (_, index) => ({ 
            id: index,
            number: rollSingleDie(),
            freeze: false,
          }))
  } 

  useEffect(() => {
    firstRoll();
  }, []);

  useEffect(() => {
    const storedTime = localStorage.getItem('bestTime');
    storedTime && setBestTime(JSON.parse(storedTime));
  }, []);

  useEffect(() => {
    if (isConfettiActive) {
      const storedTime = localStorage.getItem('bestTime');
      if (storedTime) {
        const parsedTime = JSON.parse(storedTime);
        const storedTimeMs = new Date(parsedTime.h, parsedTime.m, parsedTime.s, parsedTime.ms).getTime();
        const timeMs = new Date(time.h, time.m, time.s, time.ms).getTime();
        if (timeMs < storedTimeMs) {
          localStorage.setItem('bestTime', JSON.stringify(time));
          setBestTime(time);
        } else {
          setBestTime(parsedTime);
        }
      } else {
        localStorage.setItem('bestTime', JSON.stringify(time));
        setBestTime(time);
      }
    }
  }, [isConfettiActive]);

  useEffect(() => {
    tenzies();
  }, [diceArr]);

  const tenzies = () => {
    const frozenDice = diceArr.filter(die => die.freeze);

    if (frozenDice.length === diceArr.length && frozenDice.length > 0) {
      const firstNumber = frozenDice[0].number;
      if(frozenDice.every(die => die.number === firstNumber)) {
        stopTimer();
        setIsConfettiActive(true);
        return;
      }
    }

    return;
  }

  function rollSingleDie() {
    return Math.floor(Math.random() * 6) + 1;
  }

  const rollDice = () => {
    timerInterv && setRollCount(prev => prev + 1);
    setDiceArr(prevArr => {
      return prevArr.map(die => {
        return !die.freeze
          ? { ...die, number: rollSingleDie() }
          : die
      })
    })
  }
  
  const firstRoll = () => {
    setDiceArr(makeNewArr());
    
    const startRollInterval = setInterval(() => {rollDice()}, delay);

    setTimeout(() =>  clearInterval(startRollInterval), 700);
  }

  const resetBestTime = () => {
    localStorage.removeItem('bestTime');
    setBestTime({ms:0, s:0, m:0, h:0});
  }

  let updatedMs = time.ms, 
    updatedS = time.s, 
    updatedM = time.m, 
    updatedH = time.h; 

  const runTimer = () => {
    if(updatedM == 60) {
      updatedH++;
      updatedM = 0;
    }
    if(updatedS === 60){
      updatedM++;
      updatedS = 0;
    }
    if(updatedMs === 100){
      updatedS++;
      updatedMs = 0;
    }
    updatedMs++;
    return setTime({ ms: updatedMs, s: updatedS, m: updatedM, h: updatedH });
  }

  const startTimer = () => {
    if (!timerInterv) {
      runTimer();
      setTimerInterv(setInterval(runTimer, 10));
    }
  };

  const stopTimer = () => {
    clearInterval(timerInterv);
    setTimerInterv(null);
    console.log("Stop Timer");
  }

  const resetTimer = () => {
    clearInterval(timerInterv);
    setTimerInterv(null);
    setTime({ms:0, s:0, m:0, h:0});
    console.log("Reset Timer");
  }

  const reset = () => {
    resetTimer();
    setRollCount(0);
    setIsConfettiActive(false);
    firstRoll();
  }


  const handleClick = () => {
    isConfettiActive ? reset() : rollDice();
  }
    
    
  return (
      <main>
          <div className="game--container">

              {isConfettiActive && (
                <Confetti
                  width={window.innerWidth}
                  height={window.innerHeight}
                />
              )}

              <h1 className="game--title">Tenzies</h1>
              <p className="game--description">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>

              <Toggle onChange={(event) => setUseNumbers(event.target.checked)} />

              <div className="game--grid">
                {diceArr.map((die) => {
                  return <Die die={die} key={die.id} setDiceArr={setDiceArr} startTimer={startTimer} useNumbers={useNumbers} />
                })}
              </div>

              <button className="button--roll" onClick={handleClick}>
                <span>
                  {isConfettiActive ? 'Reset' : 'Roll' }
                </span>
              </button>
              
              <Stats time={time} bestTime={bestTime} resetBestTime={resetBestTime} setTime={setTime} rollCount={rollCount} />
          </div>
      </main>
  )
  
}


export default App
