import React from "react";
import Timer from "../Timer/Timer";
import "./Stats.css";

const Stats = ({ time, bestTime, rollCount, resetBestTime }) => {

    return (
        <div className="stats--row">
            <div className="stats--time">
                <h3>Timer: <Timer time={time} /></h3>
                <h3>Best Time: <Timer time={bestTime} /></h3>
            </div>
            <div>
                <h3>Rolls: {rollCount}</h3>
                <h3 className="link" onClick={resetBestTime}>Reset Best Time</h3>
            </div>
        </div>
    )
}

export default Stats;