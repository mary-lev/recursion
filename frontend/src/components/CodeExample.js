import Markdown from 'react-markdown';
import CodeMirror from "@uiw/react-codemirror";
import { vscodeDark } from "@uiw/codemirror-theme-vscode";
import { python } from '@codemirror/lang-python';

import {
  Flex,
  Box,
  Text,
  useMediaQuery
} from '@chakra-ui/react';

const CodeExample = () => {
  const [isLargerThanLG] = useMediaQuery('(min-width: 62em)');
  const code = `def factorial(n):
  # Base case: if n is 0, the factorial is 1
  if n == 0:
      return 1
  # Recursive case: n! = n * (n-1)!
  else:
      return n * factorial(n-1)

# Example usage
print(factorial(5))  # Output: 120
`
  const codeTaskDescription = `
  Using the book counting analogy for the factorial function:

    - Big Task: Find the factorial of a number, say 5 (which means 5 * 4 * 3 * 2 * 1).
    - Break It Down: To find 5!, find 4! first (which is 4 * 3 * 2 * 1), then multiply that by 5.
    - Stopping Point: If we reach 1, we know the factorial of 1 is just 1, so we don't need to break it down further.
    - Combine Solutions: Multiply each step's result by the next number up until we reach our original number.

    `;

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
        <Markdown>{codeTaskDescription}</Markdown>
      </Text>
       {/* Flex container for CodeMirror blocks */}
       <Flex justifyContent="space-around" w="60%">
        <Box flex="1" mr={2}>
          <CodeMirror
            value={code}
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