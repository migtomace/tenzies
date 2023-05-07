import React from "react";
import "./Die.css";

const Die = ({ die, setDiceArr, startTimer, useNumbers }) => {
    
    const toggleFrozen = () => {
        startTimer();
        setDiceArr(prevArr => {
            return prevArr.map(prevDie => {
                return prevDie.id === die.id
                    ? { ...prevDie, freeze: !prevDie.freeze }
                    : prevDie;
            })
        })
    }

	// How to Create a Dice Roll Game using HTML CSS & JavaScript
	// https://www.youtube.com/watch?v=M3InbHr0WAc
    const dotPositionMatrix = {
		1: [
			[50, 50]
		],
		2: [
			[20, 20],
			[80, 80]
		],
		3: [
			[20, 20],
			[50, 50],
			[80, 80]
		],
		4: [
			[20, 20],
			[20, 80],
			[80, 20],
			[80, 80]
		],
		5: [
			[20, 20],
			[20, 80],
			[50, 50],
			[80, 20],
			[80, 80]
		],
		6: [
			[20, 20],
			[20, 80],
			[50, 20],
			[50, 80],
			[80, 20],
			[80, 80]
		]
	};

    
    const dots = () => {
        const dotPositions = dotPositionMatrix[die.number];
      
        return dotPositions.map((position, index) => {
          const [top, left] = position;
          const styles = {
            top: `${top}%`,
            left: `${left}%`
          };
          return <div key={index} className="dot" style={styles}></div>;
        });
      };


    return (
        <div className={`die${die.freeze ? ' frozen' : ''}`} onClick={toggleFrozen}>
            {useNumbers ? die.number : dots()}
        </div>
    )
}

export default Die;