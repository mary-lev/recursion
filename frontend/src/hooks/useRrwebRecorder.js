import { useRef, useEffect, useContext } from 'react';
import { record } from 'rrweb';
import SessionTokenContext from '../contexts/SessionTokenContext';


export const useRrwebRecorder = () => {
  const sessionToken = useContext(SessionTokenContext);
  const eventsRef = useRef([]);

  useEffect(() => {
    const stopRecording = record({
      emit(event) {
        eventsRef.current.push(event);
      },
    });

    const sendEventsToServer = async () => {
      // Send events in batches of 20
      while (eventsRef.current.length > 0) {
        const batch = eventsRef.current.slice(0, 20);
        console.log(`Sending batch of ${batch.length} events:`, batch);
        try {
          const response = await fetch('http://localhost:8000/store-rrweb-events', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${sessionToken}`,
            },
            body: JSON.stringify({
              username: 'user123',
              session_id: sessionToken, // Adjust session ID as needed
              start_time: new Date().toISOString(),
              events: batch,
            }),
          });
          if (response.ok) {
            console.log('Batch sent successfully');
            // Remove sent events from the beginning of the array
            eventsRef.current.splice(0, batch.length);
          } else {
            console.error('Failed to send batch:', response.statusText);
            break; // Stop sending if there was an error
          }
        } catch (error) {
          console.error('Error sending batch:', error);
          break; // Stop sending if there was an error
        }
      }
    };
    
    // Still use setInterval to periodically attempt to send events
    const intervalId = setInterval(sendEventsToServer, 10000);
    
    return () => {
      stopRecording();
      clearInterval(intervalId);
      sendEventsToServer(); // Attempt to send any remaining events on unmount
    };
    
  }, []); // Dependencies array remains empty to ensure setup runs once on mount

  // Make sure UserContext provides the necessary user information
};
