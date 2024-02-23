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
import data from './texts.json';


const BasicExplanation = () => {
    const [isLargerThanLG] = useMediaQuery('(min-width: 62em)');
    const toast = useToast();
    const [checkedItems, setCheckedItems] = useState([]);

    const handleCheckboxChange = (values) => {
        setCheckedItems(values);
    };

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
                {data.texts.definition}
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
                            {data.texts.detailDefinition}
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
                        {data.texts.options.map((option) => (
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