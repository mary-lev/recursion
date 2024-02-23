import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Text,
    Img,
    Checkbox,
    CheckboxGroup,
    Stack,
    Button,
    useMediaQuery,
    useToast
} from '@chakra-ui/react';
import {
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon,
} from '@chakra-ui/react'
import React, { useState } from 'react';
import matryoushka from '../assets/matryoushka.bin';


const BasicExplanation = () => {
    const [isLargerThanLG] = useMediaQuery('(min-width: 62em)');
    const toast = useToast();
    const [checkedItems, setCheckedItems] = useState([]);

    const baseCasetext = `
    Recursion is a process where a task solves itself by breaking it down into smaller, identical tasks, until reaching a simple case it can directly solve.
    `;

    const detailedCasetext = `
    Picture counting a stack of books not all at once, but by counting one book and asking a friend to count the remainder with the same strategy. 
    This process repeats, with each friend taking one book and passing the rest on, until only one book is left—an easy count.
    The last friend starts by reporting their count to the friend before them, and this continues back to you, combining each count along the way to get the total. 
    This method effectively breaks down and solves a problem through repetition and aggregation.
    `;

    const handleCheckboxChange = (values) => {
        setCheckedItems(values);
    };

    const options = [
        { id: 'option1', name: 'Matryoshka dolls (Russian nesting dolls) opening one after another.' },
        { id: 'option2', name: 'Cleaning a house room by room.' },
        { id: 'option3', name: 'A mirror reflecting another mirror.' },
        { id: 'option4', name: 'The process of making a sandwich.' },
        { id: 'option5', name: 'A family tree tracing back generations.' },
        { id: 'option6', name: 'Water flowing down a river.' },
        { id: 'option7', name: 'The structure of a fractal, where each part is a smaller copy of the whole.' },
        { id: 'option8', name: 'A countdown timer that subtracts one second until reaching zero.' },
    ];

    const submitForm = () => {
        const response = {
            title: 'Message sent!🚀',
            description: 'Thank you for contacting us!',
            status: 'success',
            duration: 9000,
            isClosable: true,
        };
        return toast(response);

    };
    return (
        <Flex
            w="full"
            minHeight="40vh"
            py="6"
            px={isLargerThanLG ? '16' : '6'}
            alignItems="center"
            flexDirection="column"
            justifyContent="center"
        >
            <Text fontSize="3xl" mb="6">
                Recursion: Definition
            </Text>
            <Text
                mb="6"
                fontSize="lg"
                opacity={0.7}
                w={isLargerThanLG ? '60%' : 'full'}
            >
                {baseCasetext}
            </Text>      
                <Accordion allowMultiple w="30%">
                    <AccordionItem>
                        <h2>
                            <AccordionButton>
                                <Box as="span" flex='1' textAlign='left'>
                                    Not clear?
                                </Box>
                                <AccordionIcon />
                            </AccordionButton>
                        </h2>
                        <AccordionPanel pb={4} w="80%" m="auto">
                            {detailedCasetext}
                        </AccordionPanel>
                    </AccordionItem>
                    <AccordionItem>
                        <h2>
                            <AccordionButton>
                                <Box as="span" flex='1' textAlign='left'>
                                    Draw it!
                                </Box>
                                <AccordionIcon />
                            </AccordionButton>
                        </h2>
                        <AccordionPanel pb={4} w="80%" m="auto">
                        <Img src={matryoushka} alt="Recursion" width={{ base: "100px", md: "150px", lg: "200px" }} />
                        </AccordionPanel>
                    </AccordionItem>
                    <AccordionItem>
                        <h2>
                            <AccordionButton>
                                <Box as="span" flex='1' textAlign='left'>
                                    Video?
                                </Box>
                                <AccordionIcon />
                            </AccordionButton>
                        </h2>
                        <AccordionPanel pb={4} w="80%" m="auto">
                        <Img src={matryoushka} alt="Recursion" width={{ base: "100px", md: "150px", lg: "200px" }} />
                        </AccordionPanel>
                    </AccordionItem>
                </Accordion>

            <FormControl
                w={isLargerThanLG ? '60%' : 'full'}
                display="flex"
                flexDirection="column"
                alignItems="start"
            >
                <FormLabel>Choose the recursion cases:</FormLabel>
                <CheckboxGroup colorScheme="blue" onChange={handleCheckboxChange}>
                    <Stack pl={6} mt={2} spacing={2} mb={8}>
                        {options.map((option) => (
                            <Checkbox key={option.id} value={option.id}>{option.name}</Checkbox>
                        ))}
                    </Stack>
                </CheckboxGroup>
                <Button
                    colorScheme="blue"
                    size="lg"
                    textAlign="left"
                    width="200px"
                    type="submit"
                    onClick={submitForm}
                >
                    SUBMIT
                </Button>
            </FormControl>
        </Flex>
    );
};

export default BasicExplanation;