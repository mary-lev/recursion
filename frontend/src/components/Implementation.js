import Markdown from 'react-markdown';
import CodeMirror from "@uiw/react-codemirror";
import { vscodeDark } from "@uiw/codemirror-theme-vscode";
import { python } from '@codemirror/lang-python';

import {
    Flex,
    Box,
    Text,
    Button,
    useMediaQuery,
    Collapse, useDisclosure
} from '@chakra-ui/react';

import React, { useState } from 'react';


const Implementation = () => {
    const [isLargerThanLG] = useMediaQuery('(min-width: 62em)');
    const { isOpen, onToggle } = useDisclosure();
    const taskDescription = `
    Implement a Python function named fibonacci that calculates the nth number in the Fibonacci sequence using recursion. 
    The Fibonacci sequence is a series of numbers where each number is the sum of the two preceding ones, usually starting with 0 and 1.
    `;
    const instructions = `
    Base Cases:
        If n == 0, return 0 because the first number of the Fibonacci sequence is 0.
        If n == 1, return 1 as the second number in the sequence is 1.

    Recursive Step: For n > 1, the function should return the sum of the nth number's two predecessors in the sequence. This involves calling the fibonacci function recursively with n-1 and n-2.

    Function Signature: Use the function signature def fibonacci(n):, where n is the position in the Fibonacci sequence of the number you want to find.

    Examples for Testing Your Function:
        fibonacci(0) should return 0.
        fibonacci(1) should return 1.
        fibonacci(5) should return 5, since the sequence up to this point is 0, 1, 1, 2, 3, 5.
    `;

    const hints = `
    Remember that the Fibonacci sequence starts with 0 and 1, and each subsequent number is the sum of the previous two.
    Your function will have two base cases and one recursive step that calls itself twice to compute the sum for n-1 and n-2.
    `;

    const code = "def fibonacci():"
    const codeOutputText = "# Here will be the output of your code"

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
        Recursion: Real Implementation
      </Text>
      <Text
        mb="6"
        fontSize="lg"
        opacity={0.7}
        w={isLargerThanLG ? '60%' : 'full'}
      >
        {taskDescription}
      </Text>
       {/* Flex container for CodeMirror blocks */}
       <Flex justifyContent="space-around" w="70%">
        <Box flex="1" mr={2}>
          <CodeMirror
            value={code}
            height="200px"
            theme={vscodeDark}
            options={{ lineNumbers: true }}
            extensions={[python()]}
          />
        </Box>
        <Box flex="1" ml={2}>
          <CodeMirror
            value={codeOutputText}
            height="200px"
            theme={vscodeDark}
            options={{ lineNumbers: true }}
            extensions={[python()]}
            editable={false}
          />
        </Box>
      </Flex>
      <Box p={4}>
        <Button onClick={onToggle} mb={4} textAlign="right">
          {isOpen ? 'Hide Details' : 'Instructions'}
        </Button>
        <Collapse in={isOpen} animateOpacity>
          <Box
            p="40px"
            color="black"
            mt="4"
            bg="gray.100"
            rounded="md"
            shadow="md"
          >
            {instructions}

          </Box>
        </Collapse>
      </Box>
    </Flex>
  );
};

export default Implementation;