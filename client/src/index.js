import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { UserProvider } from './context/UserContext';
import { OnlineFriendProvider } from './context/OnlineFriend';
import { ChakraProvider } from '@chakra-ui/react';
import axios from 'axios'; // Import axios here

// Set the global default for axios here
axios.defaults.withCredentials = true;

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode> 
    <ChakraProvider>
      <UserProvider> 
        <OnlineFriendProvider>
          <App />
        </OnlineFriendProvider>
      </UserProvider>
    </ChakraProvider>
  </React.StrictMode>
);