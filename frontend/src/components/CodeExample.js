import React, { useState, useContext } from 'react';
import Markdown from 'react-markdown';
import CodeMirror from "@uiw/react-codemirror";
import { vscodeDark } from "@uiw/codemirror-theme-vscode";
import { python } from '@codemirror/lang-python';
import data from './texts.json';
import { executeCode } from '../utils';
import SessionTokenContext from '../contexts/SessionTokenContext';
import { useStepStatus } from '../contexts/StepStatusContext';


import {
  Flex,
  Box,
  Card,
  CardBody,
  Text,
  Button,
  useMediaQuery
} from '@chakra-ui/react';

const CodeExample = ({ taskName }) => {
  const current_task = data.tasks[taskName];
  const [isLargerThanLG] = useMediaQuery('(min-width: 62em)');
  const [code, setCode] = useState(current_task.code);
  const [output, setOutput] = useState(current_task.output_default);
  const sessionToken = useContext(SessionTokenContext);
  const { markStepCompleted } = useStepStatus();
  const [hintProvided, setHintProvided] = useState(false);
  const [hintRequested, setHintRequested] = useState(false);
  const [feedback, setFeedback] = useState("");

  const handleCodeChange = (value, viewUpdate) => {
    setCode(value); // Update the code state with the new value
  };

  const handleRequestHint = () => {
    setHintRequested(true); // Indicate that the hint was requested
  };

  const requestFeedback = async () => {
    const payload = {
      code: code,
      task_name: current_task.slug,
    };
    console.log("Payload", payload);
    const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/help`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${sessionToken}`,
      },
      body: JSON.stringify(payload),
    });
    const data = await response.json(); // Parse the JSON data from the response
    console.log("Response from server:", data);
    if (response.ok) {
      setFeedback(data.hint);
    }
  }

  const submitForm = async () => {
    setHintRequested(false);
    setFeedback("");

    const response = await executeCode(code, sessionToken, current_task.slug); // Assuming executeCode is an async function
    setOutput(response); // Update the output state with the response

    if (response) {
      console.log("Response from server:", response);

      if (response.success) {
        setOutput(response.output);

        if (response.output === current_task.output_default) {
          // don't change the state if the output is the same as the default
          console.log("Output is the same as the default");
          setFeedback(data.texts.using_default_code)
          setHintRequested(true);
        }

        if (current_task.answer && response.output === current_task.answer) {
          // result is correct
          console.log("Correct answer!");
          setFeedback(data.texts.correct_answer);
          markStepCompleted(current_task.id);
        }

      } else {
        setOutput(response.output);
        setHintProvided(true);
        requestFeedback();
      }
    }
  };

  return (
    <Flex
      w="full"
      minHeight="90vh"
      py="16"
      px={isLargerThanLG ? '16' : '6'}
      alignItems="center"
      flexDirection="column"
      justifyContent="center"
      bg="white.100"
    >
      <Text fontSize="3xl" mb="6">
        {current_task.name}
      </Text>
      <Text
        mb="6"
        fontSize="lg"
        opacity={0.7}
        w={isLargerThanLG ? '60%' : 'full'}
      >
        <Markdown>{current_task.text}</Markdown>
      </Text>

      {/* Flex container for CodeMirror blocks */}

      <Flex justifyContent="space-around" w="70%">
        <Box flex="1" mr={2}>
          <CodeMirror
            value={current_task.code}
            height="260px"
            theme={vscodeDark}
            options={{ lineNumbers: true, mode: 'python', autoFocus: true, indentUnit: 4 }}
            extensions={[python()]}
            onChange={handleCodeChange}
          />
        </Box>
        <Box flex="1" ml={2}>
          <CodeMirror
            value={output}
            height="260px"
            theme={vscodeDark}
            options={{ lineNumbers: true }}
            extensions={[python()]}
            editable={false}
          />
        </Box>
      </Flex>
      <Flex mt="4" justifyContent="start" gap="4">
        <Button
          colorScheme="blue"
          size="lg"
          textAlign="left"
          width="150px"
          type="submit"
          onClick={submitForm}
        >
          RUN
        </Button>
        {hintProvided && ( // Conditionally render the "Wanna hint?" button
          <Button
            colorScheme="teal"
            size="lg"
            textAlign="left"
            width="150px"
            type="submit"
            onClick={handleRequestHint}
          >
            HELP?
          </Button>
        )}
      </Flex>
      {(feedback && hintRequested) && (
        <Box w="60%">
          <Card size='md' mt="6" style={{ border: '2px solid #007bff' }}>
            <CardBody>
              <Text><Markdown>{feedback}</Markdown></Text>
            </CardBody>
          </Card>
        </Box>
      )}
    </Flex>
  );
};

export default CodeExample;