import Markdown from 'react-markdown';
import CodeMirror from "@uiw/react-codemirror";
import { vscodeDark } from "@uiw/codemirror-theme-vscode";
import { python } from '@codemirror/lang-python';
import data from './texts.json';

import {
  Flex,
  Box,
  Text,
  useMediaQuery
} from '@chakra-ui/react';

const CodeExample = () => {
  const [isLargerThanLG] = useMediaQuery('(min-width: 62em)');

  return (
    <Flex
      w="full"
      minHeight="90vh"
      py="16"
      px={isLargerThanLG ? '16' : '6'}
      alignItems="center"
      flexDirection="column"
      justifyContent="center"
      bg="green.100"
    >
      <Text fontSize="3xl" mb="6">
        Recursion: Code Example
      </Text>
      <Text
        mb="6"
        fontSize="lg"
        opacity={0.7}
        w={isLargerThanLG ? '60%' : 'full'}
      >
        <Markdown>{data.texts.codeExample}</Markdown>
      </Text>
      {/* Flex container for CodeMirror blocks */}
      <Flex justifyContent="space-around" w="60%">
        <Box flex="1" mr={2}>
          <CodeMirror
            value={data.texts.pythonCodeExample}
            height="250px"
            theme={vscodeDark}
            options={{ lineNumbers: true }}
            extensions={[python()]}
          />
        </Box>
      </Flex>
    </Flex>
  );
};

export default CodeExample;