import {
    Flex,
    Box,
    Card,
    CardBody,
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
import React, { useState, useContext } from 'react';
import matryoushka from '../assets/matryoushka.bin';
import data from './texts.json';
import SessionTokenContext from '../SessionTokenContext';
import QuizContext from '../QuizContext';
import Markdown from 'react-markdown';



const BasicExplanation = () => {
    const [isLargerThanLG] = useMediaQuery('(min-width: 62em)');
    const toast = useToast();
    const [checkedItems, setCheckedItems] = useState([]);

    const sessionToken = useContext(SessionTokenContext);
    const quiz = useContext(QuizContext);
    console.log("Quiz", quiz.options);
    const [ feedback, setFeedback ] = useState([]);


    const handleCheckboxChange = (values) => {
        setCheckedItems(values);
    };

    const submitForm = async () => {
        const payload = {
            checked_items: checkedItems,
            task: quiz.id,
        };

        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/check`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${sessionToken}`,
            },
            body: JSON.stringify(payload),
        });

        const responseData = await response.json();
        setFeedback(responseData.message);

        if (responseData.success) {

            toast({
                title: 'Great job!',
                description: quiz.sucess_message,
                status: 'success',
                duration: 9000,
                isClosable: true,
            });
        } else {
            toast({
                title: 'Submission failed',
                description: responseData.message,
                status: 'error',
                duration: 9000,
                isClosable: true,
            });
        }
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
                mt="6"
                flexDirection="column"
                alignItems="start"
            >
                <FormLabel>{quiz.question}</FormLabel>
                <CheckboxGroup colorScheme="blue" onChange={handleCheckboxChange}>
                    <Stack pl={6} mt={2} spacing={2} mb={8}>
                        {data.tasks.quiz.options.map((option) => (
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
            {feedback.length > 0 ? (
  <Box w="60%">
    <Card size='md' mt="6" style={{ border: '2px solid #007bff'}}>
      <CardBody>
        <Text><Markdown>{feedback}</Markdown></Text>
      </CardBody>
    </Card>
  </Box>
) : null}   

        </Flex>
    );
};

export default BasicExplanation;