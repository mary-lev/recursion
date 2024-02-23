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

const BaseExcersize = () => {
  const [isLargerThanLG] = useMediaQuery('(min-width: 62em)');
  const { isOpen, onToggle } = useDisclosure();
  const code = "print('Hello World!');"
  return (
    <Flex
      w="full"
      minHeight="90vh"
      py="16"
      px={isLargerThanLG ? '16' : '6'}
      alignItems="center"
      flexDirection="column"
      justifyContent="center"
      bg="blue.100"
    >
      <Text fontSize="3xl" mb="6">
        Recursion: Basic Excersise
      </Text>
      <Text
        mb="6"
        fontSize="lg"
        opacity={0.7}
        w={isLargerThanLG ? '60%' : 'full'}
      >
        Recursion is a process where a task solves itself by breaking it down into smaller, identical tasks, until reaching a simple case it can directly solve.
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
            value={code}
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
          {isOpen ? 'Hide Details' : 'Not Clear'}
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
            Imagine you're opening a doll and inside there's a smaller doll. You open that one to find an even smaller doll inside, and this continues until you reach the tiniest doll, which cannot be opened. In recursion, solving a big problem involves breaking it down into smaller versions of the same problem, until reaching a point where the problem is simple enough to solve without further division.

          </Box>
        </Collapse>
      </Box>
    </Flex>
  );
};

export default BaseExcersize;