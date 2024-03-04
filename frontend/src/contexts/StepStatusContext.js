// src/contexts/StepStatusContext.js
import React, { createContext, useContext, useState } from 'react';

const StepStatusContext = createContext();

export const useStepStatus = () => useContext(StepStatusContext);

export const StepStatusProvider = ({ children }) => {
    const [completedSteps, setCompletedSteps] = useState([]);

    const markStepCompleted = (stepIndex) => {
        setCompletedSteps((prevSteps) => {
            if (!prevSteps.includes(stepIndex)) {
                return [...prevSteps, stepIndex];
            }
            return prevSteps;
        });
    };

    return (
        <StepStatusContext.Provider value={{ completedSteps, markStepCompleted }}>
            {children}
        </StepStatusContext.Provider>
    );
};
