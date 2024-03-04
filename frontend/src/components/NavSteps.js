import React, { useState, useEffect } from 'react';
import {
    Text,
    useColorModeValue,
    Box,
    Step,
    StepDescription,
    StepIcon,
    StepIndicator,
    StepNumber,
    StepSeparator,
    StepStatus,
    StepTitle,
    Stepper,
} from '@chakra-ui/react';

import { useStepStatus } from '../contexts/StepStatusContext';


const Nav = () => {
    const scroll = useState(false);
    const navBg = useColorModeValue('white', 'blackAlpha.200');
    const { completedSteps } = useStepStatus();
    const [activeStep, setActiveStep] = useState(0);

    const steps = [
        { title: '', description: 'What is it?' },
        { title: '', description: 'Code Example' },
        { title: '', description: 'Find a Bug!' },
        { title: '', description: "Basic Excersize" },
        { title: '', description: "Real Implementation" },
        { title: '', description: "Success!" },
    ]

    useEffect(() => {
        if (completedSteps.length > 0) {
            const lastCompletedStep = completedSteps[completedSteps.length - 1];
            const nextStep = lastCompletedStep + 1;

            if (nextStep < steps.length) {
                setActiveStep(nextStep);
            }
        }
    }, [completedSteps, steps.length]);

    return (
        <Box
            border={15}
            pb="6"
            pt="6"
            pl="4"
            pr="4"
            boxShadow={scroll ? 'base' : 'none'}
            position="sticky" top="0"
            zIndex="sticky"
            h="13vh"
            w="full"
            bg={navBg}
        >
            <Text
                fontSize="2xl" 
                fontWeight="bold"
                textAlign="center"
                pb="3"
                fontFamily="'Roboto', sans-serif"
            >
                Do you know Recursion?
            </Text>
            <Stepper size='lg' index={activeStep}>
                {steps.map((step, index) => (
                    <Step key={index}>
                        <StepIndicator>
                            <StepStatus
                                complete={completedSteps.includes(index) ? <StepIcon /> : <StepIcon />}
                                incomplete={!completedSteps.includes(index) ? <StepNumber /> : "test"}
                                // active={<StepNumber />}
                                active={completedSteps.includes(index) ? <StepIcon /> : <StepNumber />}
                            />
                        </StepIndicator>

                        <Box flexShrink='1'>
                            <StepTitle>{step.title}</StepTitle>
                            <StepDescription>{step.description}</StepDescription>
                        </Box>

                        <StepSeparator />
                    </Step>
                ))}
            </Stepper>
        </Box>
    );
};

export default Nav;