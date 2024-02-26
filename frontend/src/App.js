import React, { useRef } from 'react';
import useSessionToken from './hooks/useSessionToken';
import useQuiz from './hooks/useQuiz';
import SessionTokenContext from './SessionTokenContext';
import QuizContext from './QuizContext';
import { useDisclosure, Box } from '@chakra-ui/react';
import ContactUs from './components/ContactUs';
import BasicExplanation from './components/Definition';
import CodeExample from './components/CodeExample';
import Implementation from './components/Implementation';
import WrongCodeExample from './components/WrongCodeExample';
import Footer from './components/Footer';
import BasicTask from './components/BasicExcersize';
import DrawerComponent from './components/DrawerComponent';
import Nav from './components/NavSteps';


function App() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef();
  const sessionToken = useSessionToken();
  const quiz = useQuiz();

  return (
    <SessionTokenContext.Provider value={sessionToken}>
      <QuizContext.Provider value={quiz}>
      <Box>
        <Nav ref={btnRef} onOpen={onOpen} />
        <BasicExplanation />
        <CodeExample />
        <WrongCodeExample />
        <BasicTask />
        <Implementation />
        <ContactUs />
        <Footer />
        <DrawerComponent isOpen={isOpen} onClose={onClose} btnRef={btnRef} />
      </Box>
      </QuizContext.Provider>
    </SessionTokenContext.Provider>
  );
}

export default App;
