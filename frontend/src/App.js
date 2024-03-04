import React from 'react';
import useSessionToken from './hooks/useSessionToken';

import useQuiz from './hooks/useQuiz';
import SessionTokenContext from './contexts/SessionTokenContext';
import QuizContext from './contexts/QuizContext';
import { StepStatusProvider } from './contexts/StepStatusContext';

import { Box } from '@chakra-ui/react';
// import ContactUs from './components/ContactUs';
import BasicExplanation from './components/Definition';
import CodeExample from './components/CodeExample';
import Footer from './components/Footer';
import Nav from './components/NavSteps';
import { useRrwebRecorder } from './hooks/useRrwebRecorder'; 


function App() {
  const sessionToken = useSessionToken();
  const quiz = useQuiz();
  // useRrwebRecorder();

  return (
    <SessionTokenContext.Provider value={sessionToken}>
      <StepStatusProvider>
        <QuizContext.Provider value={quiz}>
          <Box>
            <Nav />
            <BasicExplanation />
            <CodeExample taskName="code_example" />
            <CodeExample taskName="wrond_code" />
            <CodeExample taskName="code_exercise" />
            <CodeExample taskName="implementation" />
            {/* <ContactUs /> */}
            <Footer />
          </Box>
        </QuizContext.Provider>
      </StepStatusProvider>
    </SessionTokenContext.Provider>

  );
}

export default App;
