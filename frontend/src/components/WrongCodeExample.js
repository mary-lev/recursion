import React, { useState } from 'react';
import CodeMirror from "@uiw/react-codemirror";
import { vscodeDark } from "@uiw/codemirror-theme-vscode";
import { python } from '@codemirror/lang-python';
import data from './texts.json';

import {
    Flex,
    Box,
    Text,
    Button,
    useMediaQuery,
    Textarea,
    useDisclosure
} from '@chakra-ui/react';

const WrongCodeExample = () => {
    const [isLargerThanLG] = useMediaQuery('(min-width: 62em)');
    const { isOpen, onToggle } = useDisclosure();

    let [value, setValue] = useState('')

    let handleInputChange = (e) => {
        let inputValue = e.target.value
        setValue(inputValue)
    }

    return (
        <Flex
            w="full"
            minHeight="90vh"
            py="16"
            px={isLargerThanLG ? '16' : '6'}
            alignItems="center"
            flexDirection="column"
            justifyContent="center"
        >
            <Text fontSize="3xl" mb="6">
                Recursion: Find a Bug!
            </Text>
            <Text
                mb="6"
                fontSize="lg"
                opacity={0.7}
                w={isLargerThanLG ? '60%' : 'full'}
            >
                {data.texts.wrongCodeDescription}
            </Text>
            {/* Flex container for CodeMirror blocks */}
            <Flex justifyContent="space-around" w="60%">
                <Box flex="1" mr={2}>
                    <CodeMirror
                        value={data.texts.wrondCode}
                        height="250px"
                        theme={vscodeDark}
                        options={{ lineNumbers: true }}
                        extensions={[python()]}
                    />
                </Box>

            </Flex>
            <Box mt="6">
                <Button onClick={onToggle} mb={4} textAlign="right">
                    SUBMIT
                </Button>
            </Box>
            <Box mt="8" w="60%">
                <Text mb='8px'>Write an explanation here: {value}</Text>
                <Textarea
                    value={value}
                    onChange={handleInputChange}
                    placeholder='Explain what you think was wrong with the code'
                    size='sm'
                />
                <Box mt="6">
                    <Button onClick={onToggle} mb={4} textAlign="right">
                        SUBMIT
                    </Button></Box>
            </Box>

        </Flex>
    );
};

export default WrongCodeExample;