import React, { useState, useEffect } from "react";

export interface ITimeLeftProps {
    onTimeUp: () => void;
}

export const TimeLeft: React.FC<ITimeLeftProps> = ({ onTimeUp }) => {
    const [counter, setCounter] = useState(10);

    // Third Attempts
    useEffect(() => {
        const timer = counter > 0 && setInterval(() => {
            setCounter(counter - 1);
            if (counter === 1 && onTimeUp) {
                onTimeUp();
            }
        }, 1000);
        return () => clearInterval(timer as NodeJS.Timeout);
    }, [counter]);

    return (
        <div className="TimeLeft-count">
            <div className="TimeLeft-count-inner">{counter}</div>
        </div>
    );
};