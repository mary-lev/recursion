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

import React from 'react';
import data from './texts.json';


const Implementation = () => {
  const [isLargerThanLG] = useMediaQuery('(min-width: 62em)');
  const { isOpen, onToggle } = useDisclosure();
  // todo: add hints

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
       <Markdown>{data.texts.implementationDescription}</Markdown>
      </Text>
      {/* Flex container for CodeMirror blocks */}
      <Flex justifyContent="space-around" w="70%">
        <Box flex="1" mr={2}>
          <CodeMirror
            value={data.texts.implementationCode}
            height="200px"
            theme={vscodeDark}
            options={{ lineNumbers: true }}
            extensions={[python()]}
          />
        </Box>
        <Box flex="1" ml={2}>
          <CodeMirror
            value="#Here will be the output of your code"
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
            {data.texts.implementationInstructions}

          </Box>
        </Collapse>
      </Box>
    </Flex>
  );
};

export default Implementation;