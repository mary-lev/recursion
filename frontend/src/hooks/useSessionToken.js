import { useEffect, useState } from 'react';

const useSessionToken = () => {
  const [token, setToken] = useState('');

  function collectDeviceInfo() {
    const deviceInfo = {
      userAgent: navigator.userAgent,
      platform: navigator.platform,
      screenResolution: `${window.screen.width}x${window.screen.height}`,
      viewportSize: `${window.innerWidth}x${window.innerHeight}`,
      language: navigator.language,
      languages: navigator.languages,
      connectionType: navigator.connection ? navigator.connection.type : 'unknown',
      speed: navigator.connection ? navigator.connection.downlink : 'unknown',
      devicePixelRatio: window.devicePixelRatio,
      prefersDarkMode: window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'Yes' : 'No',
      hardwareConcurrency: navigator.hardwareConcurrency,
    };
  
    return deviceInfo;
  }
  

  useEffect(() => {
    const fetchToken = async () => {
      const payload = collectDeviceInfo();
      console.log('Payload:', payload);
      try {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/start_session`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        localStorage.setItem('sessionToken', data.token); // Assuming the token is in data.token
        setToken(data.token);
      } catch (error) {
        console.error('Error fetching session token:', error);
      }
    };

    // Check if the token is already stored in localStorage
    const storedToken = localStorage.getItem('sessionToken');
    if (storedToken) {
      setToken(storedToken);
    } else {
      // Fetch token from the backend if it's not in localStorage
      fetchToken();
    }
  }, []);

  return token;
};

export default useSessionToken;
