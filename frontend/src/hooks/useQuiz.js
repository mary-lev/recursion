import { useEffect, useState } from 'react';

const useQuiz = () => {
  const [quiz, setQuiz] = useState('');


  useEffect(() => {
    const fetchQuiz = async () => {

      try {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/get_quiz`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        localStorage.setItem('quiz', data); // Assuming the token is in data.token
        setQuiz(data);
      } catch (error) {
        console.error('Error fetching session token:', error);
      }
    };

    // Check if the token is already stored in localStorage
    const storedQuiz = localStorage.getItem('quiz');
    console.log("Stored", storedQuiz);
    if (storedQuiz.id) {
      setQuiz(storedQuiz);
    } else {
      // Fetch token from the backend if it's not in localStorage
      fetchQuiz();
    }
  }, []);

  return quiz;
};

export default useQuiz;
