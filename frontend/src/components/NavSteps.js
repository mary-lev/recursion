import React, { useState } from 'react';
import {
    Text,
    useColorModeValue,
    useMediaQuery,
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
    useSteps,
} from '@chakra-ui/react';


const Nav = ({ onOpen, ref }) => {
    const [scroll, setScroll] = useState(false);
    const navBg = useColorModeValue('white', 'blackAlpha.200');
    const [isLargerThanMD] = useMediaQuery('(min-width: 48em)');

    const steps = [
        { title: '', description: 'What is it?' },
        { title: '', description: 'Code Example' },
        { title: '', description: 'Find a Bug!' },
        { title: '', description: "Base Excersize" },
        { title: '', description: "Fibonacci" },
        { title: '', description: "Success!" },

    ]
    const { activeStep, setActiveStep } = useSteps({
        index: 1,
        count: steps.length,
    })

    const changeScroll = () =>
        document.body.scrollTop > 80 || document.documentElement.scrollTop > 80
            ? setScroll(true)
            : setScroll(false);

    window.addEventListener('scroll', changeScroll);

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
            <Text fontSize="xl" fontWeight="bold" textAlign="center" pb="3">
                Do you know Recursion?
            </Text>
            <Stepper size='lg' index={activeStep}>
                {steps.map((step, index) => (
                    <Step key={index} onClick={() => setActiveStep(index)}>
                        <StepIndicator>
                            <StepStatus
                                complete={<StepIcon />}
                                incomplete={<StepNumber />}
                                active={<StepNumber />}
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