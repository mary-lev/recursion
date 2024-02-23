import React, { useRef } from 'react';
import { useDisclosure, Box } from '@chakra-ui/react';
import ContactUs from './components/ContactUs';
import BasicExplanation from './components/Definition';
import CodeExample from './components/CodeExample';
import Implementation from './components/Implementation';
import WrongCodeExample from './components/WrongCodeExample';
import Footer from './components/Footer';
import BaseExcersize from './components/BasicExcersize';
import DrawerComponent from './components/DrawerComponent';
import Nav from './components/NavSteps';


function App() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef();

  return (
    <Box>
      <Nav ref={btnRef} onOpen={onOpen} />
      <BasicExplanation />
      <CodeExample />
      <WrongCodeExample />
      <BaseExcersize />
      <Implementation />
      <ContactUs />
      <Footer />
      <DrawerComponent isOpen={isOpen} onClose={onClose} btnRef={btnRef} />
    </Box>
  );
}

export default App;
